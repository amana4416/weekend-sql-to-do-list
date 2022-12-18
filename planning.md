TIP - use luxon to parse through times/have it not display that gross long string (if I get to this stretch goal)

BASE MODE

1. Make sure everything is sourced, get server running
    - installed express, body-parser, and PG
    - source stylesheet, jquery, client.js, bootstrap,
    - make a few console.logs and change h1 color to see if everything is sourced correctly
    - server boilerplate (running on localhost:5000)
    - created pool.js in a modules folder and a routes folder to keep server.js looking clean  
        - require them in server.js
    - see if server is running

2. create a database in Postico called 'weekend-to-do-app'
    - create a tasks table
    - at least 3 columns for now?
        - task name
        - task notes
        - complettion status

3. HTML boiler plate

4. create inputs in HTML
    - 2 inputs 
        - 1st for task name (this one will be rquired - can't hit submit without )
        - 2nd description of task (this one will be optional)
    - 1 button to submit task

5. head to client.js to create a click handler that will take input values and put them in an object to send to server.js when you click submit
    - callback POST request function at the bottom of this function - this will allow the POST request function to be seperate form the creating an object function (will look cleaner/each function doesn't do multiple jobs)

6. set up POST route on server.js so when the new task object comes in it can be added to the database

7. create a GET route on server.js so database can be sent back to client.js

8. create a function that is a GET request on client.js so we can append to the DOM 
    - this will also serve as a render function because we want the tasks to load on the DOM as soon as we open up the browser, so this will be called on:
        - in the onReady function at the top of the page (so tasks are there as soon as browser opens)
        - in the .then of the POST function so the page re-renders after adding a new task to the list

9. create a PUT route on server.js so we can update our completion status from not complete to complete

10. create a PUT request on client.js so we can mark tasks as complete on client side and database
    - this will require conditional rendering when we do our .append in our GET request (add a button to click when a task is not complete)
    - might need 2 PUT requests so we can toggle between complete and not complete (but we'll see)
    - on client side this function will also need a click handler to so when the 'complete' button is clicked the PUT request runs
    - also call the GET request function in the .then of the PUT request so the page re-renders when the button is clicked
    - using conditional rendering and CSS, create a visual representation when the complete button is clicked (completed tasks turn a different color that tasks that are not completed (the not complete task color should then be the default?))

11. create a DELETE route on server.js so we can delete tasks by their id

12. create a DELETE request on cient.js so we can delete tasks from the client and database
    - will use something like $(this).data().id - may or may not need parent()
    - will call the GET request in the .then of the DELETE request so the page re-renders when the delete button is clicked
    - create a click handler for the delete button so the DELETE request runs when the button is clicked
    - will also run the SweetAlert here!! .then comes after the swal() 

13. Do styling/use bootstrap, come back to re-assess after base mode is complete!!!









