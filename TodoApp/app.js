//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deletecheck);
filterOption.addEventListener('click', filterTodo);

//functions



function addTodo(event){
    //Prevent form from submitting
    event.preventDefault();

    //div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    //li
    const newTodo = document.createElement('li');

    if (todoInput.value.length == 0) 
      {
            console.log("empty field")
      }
    
    else{

   
        newTodo.innerHTML = todoInput.value;
        newTodo.classList.add("todo-item");

        //to localstorage

        saveLocalTodos(todoInput.value);
    
        //Complete button
        const completedButton = document.createElement('button')
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");


        //delete button
        const trashButton = document.createElement('button')
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");

        //append everything
        todoDiv.appendChild(completedButton);
        todoDiv.appendChild(newTodo);
        todoDiv.appendChild(trashButton);
        todoList.appendChild(todoDiv);

        todoInput.value = "";
    }
}

function deletecheck(e){
  const item = e.target;

  if(item.classList[0] === "trash-btn"){
      const todo = item.parentElement;
      removeLocalTodos(todo);
      todo.remove();

  }

  if(item.classList[0] === "complete-btn"){
    const todo = item.parentElement;
    todo.classList.toggle("completed");

}
}

function filterTodo(e){
    const todos = todoList.childNodes;
    
    todos.forEach(function(todo){
        switch(e.target.value){

            case 'all':
               
                break;

            case 'completed' :
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }
                else{
                    todo.style.display = 'none';
                }
                break;

            case 'uncompleted' :
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }
                else{
                    todo.style.display = 'none';
                }
                break;
            
        }

    });
}

function saveLocalTodos(todo){
    let todos;

    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){

    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo){

        //div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
        //li
        const newTodo = document.createElement('li');
        newTodo.innerHTML = todo;
        newTodo.classList.add("todo-item");

    
        //Complete button
        const completedButton = document.createElement('button')
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");


        //delete button
        const trashButton = document.createElement('button')
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");

        //append everything
        todoDiv.appendChild(completedButton);
        todoDiv.appendChild(newTodo);
        todoDiv.appendChild(trashButton);
        todoList.appendChild(todoDiv);


    })

}

function removeLocalTodos(todo){
   
    
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem('todos', JSON.stringify(todos))
}