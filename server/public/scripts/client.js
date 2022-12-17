$( document ).ready(onReady);

function onReady() {
    console.log('jq');
   //load existing tasks on page as soon as server is opened
   getTask();
   //createTask
}

//will turn input values into an object we can send to server
function createTask() {
    $( '#submitButton' ).on('click', function(){
        console.log( 'adding task' );
    //grab input values
    let newTask = $('#taskInput').val();
    let newNote = $('#noteInput').val();

    //make a new object to send to server
    let taskToSend = {
        task: newTask,
        note: newNote,
        complete: false
    };
    //call the function that will post this object to server
    // function postTask(taskToSend);
    })
}

//function will append data from database
function getTask() {
    console.log('in GET /task');
    //send request to server to send tasks to client
    $.ajax({
        method: 'GET',
        url: `/tasks`
    }).then((res) => {
        //empty out section and append a new updated list each time
        $('#taskList').empty();
        //display tasks on DOM
        for (let task of res) {
            $('#taskList').append(`
                <li>
                    <h4>${task.name}</h4>
                    <p> ${task.notes} </p>
                    <button id="deleteButton">Delete</button>
                    <button id="markCompleteButton"> mark complete</button>
                </li>
            `)
        }
    }).catch((err) => {
        console.log('something broke in GET /tasks', err);

    })
}