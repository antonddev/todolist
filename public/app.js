
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
});

// add todos to page
function addTodos(todos){
  todos.forEach(function(todo){
    addTodo(todo);
  });
}

// add single todo to page
function addTodo(todo){
  var newTodo = $('<li class="task">' + todo.name + '</li>');
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