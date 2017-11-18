var express = require('express');
var router = express.Router();

var database = require("../models");  // connecting todo mongo models

router.get('/', function(req, res){
  database.Todo.find() // find() - mongo method
  .then(function(todos){  // Promises
    res.json(todos);
  })
  .catch(function(err){
    res.send(err);
  })
});

router.post('/', function(req, res){
  // here we taking 'body' content and insert it into database.
  database.Todo.create(req.body) // .create mongo method
  .then(function(newTodo){
    res.status(201).json(newTodo) // 201: "is created"
  })
  .catch(function(err){
    res.send(err);
  })
});

router.get('/:todoId', function(req, res){
  database.Todo.findById(req.params.todoId) // params.todoId = /:todoId, .findById mongo method
  .then(function(foundTodo){
    res.json(foundTodo);
  })
  .catch(function(err){
    res.send(err);
  })
});

router.put('/:todoId', function(req, res){
  //.findOneAndUpdate(object_how_to_find_it, update_part, instant_update)
  database.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})  // findOneAndUpdate - mongo method
  .then(function(changedTodo){
    res.json(changedTodo);
  })
  .catch(function(err){
    res.send(err);
  })
});

router.delete('/:todoId', function(req, res){
  database.Todo.remove({_id: req.params.todoId})
  .then(function(){
    res.json({message: 'We deleted it!'});
  })
  .catch(function(err){
    res.send(err);
  })
});

module.exports = router;