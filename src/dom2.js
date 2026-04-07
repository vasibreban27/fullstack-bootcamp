import './dom.css'

const todoList = document.querySelector('[data-todo-output]');
const addTodoForm = document.querySelector('[data-todo-form]');
const todoTemplate = document.querySelector('[data-todo-template]').content;
const storageKey = 'todos'
addTodoForm.addEventListener('submit', handleAddTodo);

const fromStorage = localStorage.getItem(storageKey);
let previousData = [];

if(fromStorage){
    previousData = JSON.parse(fromStorage);
}

function handleAddTodo(event){
    event.preventDefault();

    const formData = new FormData(event.target);
    const title = formData.get('title');


   // const newTodo =  {title,completed:false};
    previousData.push({title,completed:false});
    localStorage.setItem(storageKey,JSON.stringify(previousData));


    localStorage.setItem(storageKey,JSON.stringify([{title,completed:false}]))

    for(const todo of previousData ){
        const todoElement= createTodoFromTemplate(todo,todoTemplate)
        todoList.append(todoElement);
    }

   // const todo = createTodoElement(formData.get('title'));
    todoList.append(todoElement);
}

function createTodoElement(title){
    const li = document.createElement('li');
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'checkbox'
    input.name = 'completed'
    label.append(input,title)

    li.append(label);
    return li;
}

function createTodoFromTemplate(title,todoTemplate){
    const todoElement = todoTemplate.cloneNode(true);
    todoElement.querySelector('label').append(title);
    return todoElement;
}