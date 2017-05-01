$(document).ready(onReady);

function onReady (){
  console.log('script sourced');
  getAllTasks();
  $('#addTaskButton').on('click', addTask);
  $('.taskList').on('click', 'button.delete', deleteTask);
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
       $( '.taskList' ).append( '<div class="incompleteTask" id="' + array[i].id +' ">' + array[i].task_name + ' ' + '<button class="complete">Complete</button>' + '<button class="delete">Delete</button>' + '</div>' );
        } else {
          $( '.taskList' ).append( '<div class="completedTask" id="' + array[i].id +' ">' + array[i].task_name + ' ' + '<button class="delete">Delete</button>' + '</div>' );
           }
        }//end for loop
}//end appendTasks


function deleteTask () {
  // $('button.delete').on('click', function (){
    var id = $(this).parent().attr('id');
    $.ajax ({
      url: '/deleteTask/' + id,
      method: 'DELETE',
      success: function (response){
        console.log('in delete:', response);
        getAllTasks();
        }//end success
      });//end ajax
    // });//end on delete click
}//end delete Task
