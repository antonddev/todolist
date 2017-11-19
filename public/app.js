
$(document).ready(function(){  // .ready - as long as DOM is ready, the function will run
  $.getJSON('/api/todos')
  .then(addTodos)
  .catch(function(err){
    console.log(err);
  })

  $('#todoInput').keypress(function(event){
    if(event.which == 13){ // event.which contains a key-code value 13(for enter)
      createTodo();
    }
  })

  $('.list').on('click', 'li', function(){
    updateTodo($(this));
  })

  $('.list').on('click', 'span', function(event){ // adding a click listener to ul(.list) itself, because it was on the page from the begining. Passing 'span' (dynamically added element) as the second argument to set listener on it.
    event.stopPropagation(); // this will stop the event from bubbling up (so when we clicked on a span, it's not also going to triger the parent <li>)
    removeTodo($(this).parent());
  })
});

// add todos to page
function addTodos(todos){
  todos.forEach(function(todo){
    addTodo(todo);
  });
}

// add single todo to page
function addTodo(todo){
  var newTodo = $('<li class="task">' + todo.name + ' <span>X</span></li>');
  newTodo.data('id', todo._id); // adding todo id to jQuery memory (data) to ease the DELETE functionality maintaining
  newTodo.data('completed', todo.completed); // for easy 'PUT'(updateTodo) maintaining
  if(todo.completed){
    newTodo.addClass("done");
  }
  $('.list').append(newTodo);
}

function createTodo(){
  var userInput = $('#todoInput').val();
  // send post request to create new todo
  $.post('/api/todos', {name: userInput})
  .then(function(newTodo){
    $('#todoInput').val('');
    addTodo(newTodo);
  })
  .catch(function(err){
    console.log(err);
  })
}

function updateTodo(todo){
  var updateUrl = '/api/todos/' + todo.data('id');
  var isDone = !todo.data('completed'); // grab true or false from here // isDone is what we want the value to be (opposite from the qurrent value)
  var updateData = {completed: isDone};
  $.ajax({
    method: 'PUT',
    url: updateUrl,
    data: updateData
  })
  .then(function(updatedTodo){
    todo.toggleClass('done');
    todo.data('completed', isDone);
  })
}

function removeTodo(todo){
  var clickedId = todo.data('id');
  var deleteUrl = '/api/todos/' + clickedId;
  $.ajax({
    method: 'DELETE',
    url: deleteUrl
  })
  .then(function(data){
    todo.remove();
  })
  .catch(function(err){
    console.log(err);
  })
}