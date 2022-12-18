$( document ).ready(onReady);

function onReady() {
    console.log('jq');
   //load existing tasks on page as soon as server is opened
   getTask();
   //click handler for submit button
   $('#submitButton' ).on('click', createTask);
   $('#taskList').on('click', '.markAsCompleteButton', putTask);
   $('#taskList').on('click', '.deleteButton', deleteTask);
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
            if(!task.complete) {
                $('#taskList').append(`
                <section>
                    <h4>${task.name}</h4>
                    <p> ${task.notes} </p>
                    <button data-id="${task.id}" type="button" class="btn btn-success markAsCompleteButton" style="float:left;">Complete</button>
                    <button data-id="${task.id}" type="button" class="btn btn-danger m-2 deleteButton" style="float:right;">Delete</button>
                </section>
                `);
              }
              else if (task.complete) {
                $('#taskList').append(`
                <section ${conditionallyMarkAsComplete(task)}>
                    <h4>${task.name}</h4>
                    <p> ${task.notes} </p>
                    <button data-id="${task.id}" type="button" class="btn btn-danger m-2 deleteButton" style="float:right;">Delete</button>
                </section>
                `);
              }
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
        //calling getTasks so page can re-render with updated task list
        getTask();
    }).catch((err) => {
        console.log('something broke in POST /tasks', err);
    })
}

//function to mark tasks as complete
//update DOM and database by changing completion status from false to true
function putTask() {
    console.log('task is marked as complete');
    let idToUpdate = $(this).data().id;
    console.log(idToUpdate);
    //PUT request to update database
    $.ajax({
        method: 'PUT',
        url: `/tasks/${idToUpdate}`,
        data: {
          complete: true,
        },
      }).then((res) => {
          getTask();
        }).catch((err) => {
            console.log('something broke in PUT /tasks', err);
        });
}

//function to delete tasks from the DOM and database
function deleteTask() {
    console.log('deleting a task')
    let idToDelete = $(this).data().id;
    console.log(idToDelete);
    $.ajax ({
      method: 'DELETE',
      url: `/tasks/${idToDelete}`
    }).then ((res) => {
      getTask();
    }).catch((err) => {
      console.log('error in DELETE /tasks/:id', err);
    })
}

//function to visually change the background color of tasks
//blue if task is not complete
//green if task is complete
function conditionallyMarkAsComplete(task) {
    if (task.complete === true) {
        return 'class="taskComplete"';
    } else 
        return '';
}





