//requires
var express = require ( 'express' );
var app = express();
// var pg = require( 'pg' );
var path = require ( 'path' );
var bodyParser = require ( 'body-parser' );
var port = 7777;

// setup config for pool
// var config = {
//   database: 'wknd_chal_3',
//   host: 'localhost',
//   port: 5432,
//   max: 12
// };//end pool config
// 
// //create pool using config
// var pool = new pg.Pool( config );

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
