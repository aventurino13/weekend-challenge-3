$(document).ready(onReady);

function onReady (){
  console.log('script sourced');
  getAllTasks();
  $('#addTaskButton').on('click', addTask);
  $('.taskList').on('click', deleteTask);
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
    }//end success
  });//end POST ajax
  getAllTasks();
}//end getTasks

function getAllTasks (){
  console.log ('in getAllTasks');
  $.ajax({
    url: '/getAllTasks',
    type: 'GET',
    success: function ( response ){
      console.log('back from server with:', response);
      appendTasks(response);
    }//end successs
  });//end GET
}//end get all Tasks


function appendTasks(array) {
  $( '.taskList' ).empty();
     for (var i = 0; i < array.length; i++) {
       if (array[i].complete === false){
       $( '.taskList' ).append( '<div class="incompleteTask" id="' + array[i].id +' "><p>' + array[i].task_name + ' ' + '<button id="complete">Complete</button>' + '<button id="delete">Delete</button>' + '</p></div>' );
        } else {
          $( '.taskList' ).append( '<div class="completedTask" id="' + array[i].id +' "><p>' + array[i].task_name + ' ' + '<button id="delete">Delete</button>' + '</p></div>' );
           }
        }//end for loop
}//end appendTasks

function deleteTask () {
  var id = $(this).parent().attr('id');
  console.log( $(this).parent().attr('id'));
}//end delete Task
