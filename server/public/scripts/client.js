$( document ).ready(onReady);

function onReady() {
    console.log('jq');
   createTask();
}

//will turn input values into an object we can send to server
function createTask() {
    $( '#submitButton' ).on( 'click', function(){
        console.log( 'adding task' );
    //grab input values
    let newTask = $('#taskInput').val();
    let newNote = $('#noteInput').val();
    //make a new object to send to server
    let taskToSend = {
        task: newTask,
        note: newNote
    };
    //call the function that will post this object to server
    function postTask(taskToSend);
}