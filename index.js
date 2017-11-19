var express = require("express"),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser'); // need to app.use body-parser

var todoRoutes = require('./routes/todos');

app.use(bodyParser.json()); // this allows us to capture data from POST/PUT requests.
app.use(bodyParser.urlencoded({extended: true})); // this
app.use(express.static(__dirname + '/public')); // using css folders
app.use(express.static(__dirname + '/views'));  // using css folders

app.get('/', function(req, res){
  res.send('/', function(req, res){
    res.sendFile("index.html");
  });
});

app.use('/api/todos', todoRoutes); // accessing 


app.listen(port, function(){
  console.log("Todolist Application is running on port: " + port);
});