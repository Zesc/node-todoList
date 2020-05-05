//jshint esversion:6

let express = require('express');
let todoController = require('./controllers/todoController');

let app = express();

// set uo template engine
app.set('view engine', 'ejs');

// static files
app.use(express.static(__dirname + '/public'));

// fire controllers
todoController(app);

// listen to port
app.listen(4000);
