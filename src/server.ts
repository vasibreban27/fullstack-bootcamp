import express from 'express';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello from Express 2!');
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
  });
});

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);
const TODO_FILE_PATH = join(_dirname, 'data', 'todos.json');

async function readTodosFromFile() {
  const fileContent = await readFile(TODO_FILE_PATH, 'utf8');

  return JSON.parse(fileContent);
}

async function writeTodosToFile(todos: { title: string, completed: boolean, id: string}[]) {
  const json = JSON.stringify(todos, null, 2);

  await writeFile(TODO_FILE_PATH, json);
}

let todos = [
  {
    id: '1',
    title: 'Buy Milk from Express',
    completed: false,
  },
];

app.get('/todos', async (req, res, next) => {
  try {
    const todos = await readTodosFromFile();
    res.json(todos);
  } catch(error) {
    next(error);
  }
});

app.get('/todos/:id', (req, res) => {
  const todo = todos.find((todo) => todo.id === req.params.id);

  if(!todo) {
    return res.status(404).json({
      error: "Todo not found",
    });
  }

  res.json(todo);
});

app.post('/todos', (req, res) => {
  const newTodo = {
    id: crypto.randomUUID() as string,
    title: req.body.title as string,
    completed: false,
  };

  todos.push(newTodo);

  res.status(201).json(newTodo);
});

app.patch('/todos/:id', (req, res) => {
   const todo = todos.find((todo) => todo.id === req.params.id);

    if(!todo) {
      return res.status(404).json({
        error: "Todo not found",
      });
    }

    const { title, completed } = req.body;

    todo.title = title || todo.title;
    todo.completed = completed || todo.completed;

    res.json(todo);
});

app.delete('/todos/:id', (req, res) => {
   const newTodos = todos.filter((todo) => todo.id !== req.params.id);

    if(newTodos.length === todos.length) {
      return res.status(404).json({
        error: "Todo not found",
      });
    }

    todos = newTodos;

    res.status(204).send({});
});

app.listen(PORT, (error) => {
  if (!error) {
    console.log(`The server started on port ${PORT}: http://localhost:${PORT}`);
    return;
  }

  console.error(error.message);
});
