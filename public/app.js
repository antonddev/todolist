$(document).ready(function(){  // .ready - as long as DOM is ready, the function will run
  $.getJSON('/api/todos')
  .then(addTodos)
  .catch(function(err){
    console.log(err);
  })
});

// add todos to page
function addTodos(todos){
  todos.forEach(function(todo){
    var newTodo = $('<li class="task">' + todo.name + '</li>');
    $('.list').append(newTodo);
  });
}