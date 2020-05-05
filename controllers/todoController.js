//jshint esversion:6
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb+srv://cesar:%23ZhescDev@cluster0-5hv5v.mongodb.net/test?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser:true});

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log('we are connected!');
// });

//Create schema - this is like a blueprint for data
let todoSchema = new mongoose.Schema({
  item: String
});

let Todo = mongoose.model('Todo', todoSchema);

//dummy data
//var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: "kick some coding ass"}];
var urlencoderParser = bodyParser.urlencoded({extended: false});

module.exports = (app) => {
  app.get('/todo', function (req, res) {
    //get data from mongodb and pass it to view
    Todo.find({}, (err, data) => {
      if(err) throw err;
      res.render('todo', {todos: data});
    });
  });

  app.post('/todo', urlencoderParser, (req, res) => {
    //get data from the view and add it to mongodb
    let newTodo = Todo(req.body).save((err, data) => {
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete('/todo/:item', (req, res) => {
    //delete the requested item from mongodb
    Todo.find({item:req.params.item.replace(/\-/g, " ")}).remove((err, data) => {
      if(err) throw err;
      res.json(data);
    });
  });
};
