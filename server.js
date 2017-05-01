//requires
var express = require ( 'express' );
var app = express();
var pg = require( 'pg' );
var path = require ( 'path' );
var bodyParser = require ( 'body-parser' );
var port = 7777;
var allTasks = [];

//setup config for pool
var config = {
  database: 'wknd_chal_3',
  host: 'localhost',
  port: 5432,
  max: 12
};//end pool config

//create pool using config
var pool = new pg.Pool( config );

//uses
app.use ( express.static( 'public' ) );
app.use ( bodyParser.urlencoded( { extended: true} ) );

//spin up server
app.listen ( port, function (){
  console.log('server up on:', port);
});//end spin up server

//ROUTES

//base url
app.get ('/', function( req, res){
  console.log('base url hit');
  res.sendFile( path.resolve ('public/views/index.html') );
});//end base url

//POST new task
app.post ('/addTask', function( req, res){
  console.log('in post route:', req.body);

  pool.connect ( function (err, connection, done ){
    if (err) {
     res.send ( 400 );
    } else {
      console.log('connected to db');
      connection.query("INSERT into tasks(task_name, complete) values($1, $2)", [ req.body.task, req.body.complete] );
      done(); //close connection
      res.send ( 200 );
    }//end else
  });//end pool connect
});//end app.post

app.get ('/getAllTasks', function( req, res){
  console.log('in GET tasks route');
  allTasks = [];
  pool.connect( function( err, connection, done ){
  if( err ){
    console.log( err );
    res.send( 400 );
  } else {
    console.log('connected to db');
    var resultSet = connection.query( "SELECT * from tasks" );
    resultSet.on( 'row', function( row ){
      allTasks.push( row );
    }); //end on row
    // on end of rows send array as response
    resultSet.on( 'end', function(){
      // close connection to reopen spot in pool
      done();
      // res.send array of cars
      res.send( allTasks );
      }); //end on end
    } // end no error
  }); //end pool connect
});//end getAllTasks

app.delete('/deleteTask/:id', function(req, res){
  console.log('this is req.params.id field', req.params.id);
  pool.connect (function ( err, connection, done ){
    if (err){
      res.send( 400 );
    } else {
      connection.query("DELETE FROM tasks WHERE id=$1", [req.params.id]);
      done();
      res.send("deleted");
    }//end else
  });
});

app.get('/completeTask/:id', function( req, res ) {
  pool.connect (function ( err, connection, done ){
    if (err){
      res.send( 400 );
    } else {
      connection.query("UPDATE tasks SET complete=true WHERE id=$1", [req.params.id]);
      done();
      res.send("completed");
    }//end else
  });
});
