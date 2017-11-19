
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

  $('.list').on('click', 'span', function(){ // adding a click listener to ul(.list) itself, because it was on the page from the begining. Passing 'span' (dynamically added element) as the second argument to set listener on it.
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
  newTodo.data('id', todo._id); // adding todo id to jQuery data to ease the DELETE functionality maintaining
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