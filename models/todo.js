var mongoose = require("mongoose");

var todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name cannot be blank!'
  },
  completed: {
    type: Boolean,
    default: false
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

// compiling to a model
var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;


// name
// completed
// created