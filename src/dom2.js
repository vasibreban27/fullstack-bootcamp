import './dom.css';

const storageKey = 'todos';
const fromStorage = localStorage.getItem(storageKey);

const todoList = document.querySelector('[data-todo-output]');
const addTodoForm = document.querySelector('[data-todo-form]');
const todoTemplate = document.querySelector('[data-todo-template]').content;

let prevData = [];
if (fromStorage) {
  prevData = JSON.parse(fromStorage);
}
for (const todo of prevData) {
  const todoElement = createTodoFromTemplate(todo, todoTemplate);

  todoList.append(todoElement);
}

addTodoForm.addEventListener('submit', handleAddTodo);

function handleAddTodo(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const title = formData.get('title');

    const newTodo = {
        id: crypto.randomUUID(),
        title,
        completed: false
    };

    prevData.push(newTodo);
    localStorage.setItem(storageKey, JSON.stringify(prevData));

    const todoElement = createTodoFromTemplate(newTodo, todoTemplate);
    todoList.append(todoElement);

    e.target.reset();
}

function createTodoFromTemplate(todo, todoTemplate) {
    const todoElement = todoTemplate.cloneNode(true);
    todoElement.querySelector('label').append(todo.title);

    const input = todoElement.querySelector('input');
    input.dataset.todoId = todo.id;
    input.checked = todo.completed;
    input.addEventListener('change', handleCompleteTodo);

    return todoElement;
}

function handleCompleteTodo(e) {
    const checkbox = e.target;
    const todoId = checkbox.dataset.todoId;

    const todoToChange = prevData.find(todoObj => todoObj.id === todoId);
    if (!todoToChange) return;

    todoToChange.completed = checkbox.checked;
    localStorage.setItem(storageKey, JSON.stringify(prevData));
}

function createTodoElement(title) {
  const li = document.createElement('li');
  const label = document.createElement('label');
  const input = document.createElement('input');

  input.type = 'checkbox';
  input.name = 'completed';

  label.append(input, title);
  li.append(label);

  return li;
}
