const todoMaker = document.getElementById('starterTask')
const todoTask = document.getElementById('createNewTodo')
const ulTodoList = document.querySelector('.ul-todo-list')
let todos = []
let nextId = 0

const listCounter = document.querySelector('.todo-list-count');
let counter = 0;
const countActive = () => {
    counter = 0;
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].completed === false) {
            counter++
        };
    };
    listCounter.textContent = `${counter} items left`;
};

function createNewTodo(todo){
    let newLi = document.createElement('li');
    let input = document.createElement('input');
    let checkboxLi = input;
    checkboxLi.type = 'checkbox';
    newLi.appendChild(checkboxLi);
    if(todo.completed === true){
        newLi.classList.add('li-completed')
        checkboxLi.checked = true
    };

    checkboxLi.addEventListener(('click'), () => {
        let parentLi = checkboxLi.parentElement;
        let taskId = parentLi.dataset.id;
        const todosFound = todos.find((task) => {
            if(task.id === Number(taskId)){
                return true
            };
        });
        todosFound.completed = !todosFound.completed;
        saveTodos();
        countActive();
        if(todosFound.completed === true){
            parentLi.classList.add('li-completed')
        }
        else{
            parentLi.classList.remove('li-completed')
        };
    });

    let newSpan = document.createElement('span');
    newSpan.textContent = todo.text;
    newLi.appendChild(newSpan);

    let deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button')
    let buttonSpan = document.createElement('span')
    deleteButton.appendChild(buttonSpan)
    buttonSpan.textContent = '×';

    newLi.appendChild(deleteButton);
    deleteButton.addEventListener(('click'), () => {
        let parentLi = deleteButton.parentElement;
        let taskId = parentLi.dataset.id;
        const todosFound = todos.find((task) => {
            return task.id === Number(taskId);
        });
        let index = todos.indexOf(todosFound);
        todos.splice(index, 1);
        saveTodos();
        parentLi.remove();
        countActive();
    })

    newLi.dataset.id = todo.id;
    newLi.classList.add('li-todo-list');
    ulTodoList.appendChild(newLi);
    countActive();
};

const savedTodos = localStorage.getItem('todos');
if(savedTodos !== null){
    todos = JSON.parse(savedTodos)
};
todos.forEach(task => {
    createNewTodo(task)
});

function saveTodos(){
    localStorage.setItem('todos', JSON.stringify(todos));
};


todoMaker.addEventListener(('submit'), (event) => {
    event.preventDefault();
    let todoText = todoTask.value;
    nextId += 1;
    todos.push({id: nextId,
        text: todoTask.value, 
        completed: false});
    saveTodos();
    createNewTodo({id: nextId, text: todoText, completed: false});
    todoTask.value = '';
})


function todosComplete(task){
    return task.completed === false
};
const clearCompleted = document.querySelector('.clear-completed');
clearCompleted.addEventListener(('click'), () => {
    const completeLi = document.querySelectorAll('.li-completed');
    todos = todos.filter(todosComplete);
    saveTodos();
    for (let i = 0; i < completeLi.length; i++) {
        completeLi[i].remove()
    };
    countActive();
});

const allButtons = document.querySelectorAll('.todo-condition-buttons button');

const buttonAll = document.querySelector('.all-todo');
buttonAll.addEventListener(('click'), () => {
    allButtons.forEach((button) => {
        button.classList.remove('active-button')
    });
    buttonAll.classList.add('active-button');


    const allLi = document.querySelectorAll('.li-todo-list');
    allLi.forEach((li) => {
        li.classList.remove('hidden')
    });
});

const buttonActive = document.querySelector('.active-todo');
buttonActive.addEventListener(('click'), () => {
    allButtons.forEach((button) => {
        button.classList.remove('active-button')
    });
    buttonActive.classList.add('active-button');


    const allLi = document.querySelectorAll('.li-todo-list');
    allLi.forEach((li) => {
        li.classList.remove('hidden')
        const taskId = li.dataset.id;
        const todosFound = todos.find((task) => {
            return task.id === Number(taskId);
        });
        if(todosFound.completed === true){
            li.classList.add('hidden')
        };
    });
});

const buttonCompleted = document.querySelector('.completed-todo');
buttonCompleted.addEventListener(('click'), () => {
    allButtons.forEach((button) => {
        button.classList.remove('active-button')
    });
    buttonCompleted.classList.add('active-button');


    const allLi = document.querySelectorAll('.li-todo-list');
    allLi.forEach((li) => {
        li.classList.remove('hidden')
        const taskId = li.dataset.id;
        const todosFound = todos.find((task) => {
            return task.id === Number(taskId);
        });
        if(todosFound.completed === false){
            li.classList.add('hidden')
        };
    });
});