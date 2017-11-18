var express = require("express"),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser'); // need to app.use body-parser

var todoRoutes = require('./routes/todos');

app.use(bodyParser.json()); // this allows us to capture data from POST/PUT requests.
app.use(bodyParser.urlencoded({extended: true})); // this

app.get('/', function(req, res){
  res.send('Hello from the root route! :)');
});

app.use('/api/todos', todoRoutes); // accessing 


app.listen(port, function(){
  console.log("Todolist Application is running on port: " + port);
});