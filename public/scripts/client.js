$(document).ready(onReady);

function onReady (){
  console.log('script sourced');
  $('#addTaskButton').on('click', addTask);
}

function addTask (){
  console.log('in addTasks');
  var objectToSend = {
    task: $('#addTask').val(),
    complete: false
  };
  console.log('obj', objectToSend);

  $.ajax({
    url: '/addTask',
    type: 'POST',
    data: objectToSend,
    success: function( response ){
      console.log( 'back from server with:', response );
    }
  });
}//end getTasks

function getAllTasks (){
  console.log ('in getAllTasks');
  $.ajax({
    url: '/getAllTasks',
    type: 'GET',
    success: function ( response ){
      console.log('back from server with:', response);
    }//end successs
  });//end GET
}//end get all Tasks
