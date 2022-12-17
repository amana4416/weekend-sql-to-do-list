$( document ).ready(onReady);

function onReady() {
    console.log('jq');
   //load existing tasks on page as soon as server is opened
   getTask();
   //createTask
   $('#submitButton' ).on('click', createTask);
}

//will turn input values into an object we can send to server
function createTask() {
    console.log( 'adding task' );
    //grab input values
    let newName = $('#taskInput').val();
    let newNote = $('#notesInput').val();

    //make a new object to send to server
    let taskToSend = {
        name: newName,
        notes: newNote,
        //default will be false because all tasks would start 
        //as not complete
        complete: false
    };
    //call the function that will post this object to server
    postTask(taskToSend); 
}

//function will append data from database
function getTask() {
    console.log('in GET /task');
    //ask server to send tasks to client
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

//function will send input object (taskToSend) to server
//so task can be added to the database
function postTask(newTask) {
    console.log('in POST /task', newTask);
    //send object to server
    $.ajax({
        method: 'POST',
        url: `/tasks`, 
        data: newTask
    }).then ((res) => {
        //seeing if object was posted
        console.log(res);
        //calling getTasks so page can re-render with updated list
        getTask();
    }).catch((err) => {
        console.log('something broke in POST /tasks', err);
    })
}