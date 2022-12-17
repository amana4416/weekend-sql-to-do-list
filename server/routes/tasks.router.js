const express = require('express');
const tasksRouter = express.Router();
const pool = require('../modules/pool.js');

//GET
tasksRouter.get('/', (req, res) => {
    console.log('sending tasks to client');
    let sqlQuery = `
    SELECT * FROM "tasks"
        ORDER BY "id";
    `;
    pool.query(sqlQuery)
    .then((dbRes) => {
        //send back the array of tasks
        res.send(dbRes.rows);
    }).catch ((dbErr) => {
        console.log('something broke in /tasks GET');
        res.sendStatus(500);
    })
})


//POST
tasksRouter.post('/', (req, res) => {
    let newTask = req.body
    console.log('adding a new task', newTask);

    let sqlQuery = `
    INSERT INTO "tasks" ("name", "notes", "complete")
        VALUES ($1, $2, $3);
    `
    let sqlValues = [newTask.name, newTask.notes, newTask.complete];
    pool.query(sqlQuery, sqlValues)
    .then((dbRes) => {
        res.sendStatus(200);
    }).catch((dbErr) => {
        console.log('something broke in POST /tasks', dbErr);
        res.sendStatus(500);
    })
})





//PUT






//DELETE







module.exports = tasksRouter;