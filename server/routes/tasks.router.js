const express = require('express');
const tasksRouter = express.Router();
const pool = require('../modules/pool.js');

//GET
tasksRouter.get('/', (req, res) => {
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






//PUT






//DELETE







module.exports = tasksRouter;