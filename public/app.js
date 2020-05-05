//jshint esversion:6
let express = require('express');


let app = express();

//set up engine template
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//listen to port
app.listen(3000);
console.log('you are listening to port 3000');
