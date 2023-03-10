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
                <tr class="notCompleted">
                    <td>${task.name}</td>
                    <td> ${task.notes}</td>
                    <td>
                        <button data-id="${task.id}" type="button" class="btn btn-success markAsCompleteButton">Complete</button>
                    </td>
                    <td>
                        <button data-id="${task.id}" type="button" class="btn btn-danger m-2 deleteButton">Delete</button>
                    </td>
                <tr>
                `);
              }
              else if (task.complete) {
                $('#taskList').append(`
                <tr ${conditionallyMarkAsComplete(task)}>
                    <td>${task.name}</td>
                    <td> ${task.notes}</td>
                    <td>Completed</td>
                    <td>
                        <button data-id="${task.id}" type="button" class="btn btn-danger m-2 deleteButton">Delete</button>
                    </td>
                </tr>
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
        // empty inputs after hitting submit
        $('#taskInput').val('');
        $('#notesInput').val('');
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
    swal("Are you sure you want to delete this task?", {
        title: "Delete Task",
        icon: "warning",
        dangerMode: true,
        buttons: true,
      }).then((response) => {
        if (response === true){
            $.ajax ({
            method: 'DELETE',
            url: `/tasks/${idToDelete}`
            }).then ((res) => {
            getTask();
            }).catch((err) => {
            console.log('error in DELETE /tasks/:id', err);
            })
        } 
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






