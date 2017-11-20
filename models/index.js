
var mongoose = require("mongoose");
mongoose.set('debug', true);
var mlabDb = 'mongodb://antonddev:antonddev123@ds113736.mlab.com:13736/todolist';
var localDb = 'mongodb://localhost/todo-api';
mongoose.connect(localDb);

mongoose.Promise = Promise;

module.exports.Todo = require("./todo");