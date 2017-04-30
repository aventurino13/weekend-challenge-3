$(document).ready(onReady);

function onReady (){
  console.log('script sourced');
  getTasks();
}

function getTasks (){
  console.log('in getTasks');

  // $.ajax({
  //   url: '/',
  //   type: 'GET',
  //   success: function( response ){
  //     console.log( 'back from server with:', response );
  //   }
  // });
}//end getTasks
