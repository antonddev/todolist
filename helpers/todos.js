// require database from /models
var db = require('../models');

exports.getTodos = function(req, res){
  db.Todo.find() // find() - mongo method
  .then(function(todos){  // Promises
    res.json(todos);
  })
  .catch(function(err){
    res.send(err);
  })
}

exports.createTodos = function(req, res){
  // here we taking 'body' content and insert it into database.
  db.Todo.create(req.body) // .create mongo method
  .then(function(newTodo){
    res.status(201).json(newTodo) // 201: "is created"
  })
  .catch(function(err){
    res.send(err);
  })
}

exports.getTodo = function(req, res){
  db.Todo.findById(req.params.todoId) // params.todoId = /:todoId, .findById mongo method
  .then(function(foundTodo){
    res.json(foundTodo);
  })
  .catch(function(err){
    res.send(err);
  })
}

exports.updateTodo = function(req, res){
  //.findOneAndUpdate(object_how_to_find_it, update_part, instant_update)
  db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})  // findOneAndUpdate - mongo method
  .then(function(changedTodo){
    res.json(changedTodo);
  })
  .catch(function(err){
    res.send(err);
  })
}

exports.deleteTodo = function(req, res){
  db.Todo.remove({_id: req.params.todoId})
  .then(function(){
    res.json({message: 'We deleted it!'});
  })
  .catch(function(err){
    res.send(err);
  })
}

module.exports = exports;