const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const tasksRouter = require('./routes/tasks.router.js');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

//forward to routes folder
app.use('/tasks', tasksRouter)

//listen for server on PORT 5000
app.listen(PORT, () => {
    console.log('listening on port', PORT);
  });
