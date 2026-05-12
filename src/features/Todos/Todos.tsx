import { useEffect, useState } from "react";
import type { Todo } from "./types";
import { TodoItem } from "./TodoItem";

export function Todos() {
  const [todos, setTodos] = useState<Todo[] | null>(null);

  useEffect(() => {
    void fetch(`/api/todos`).then((res) => res.json()).then(setTodos);
  }, []);

  async function handleAddTodo(formData: FormData) { 
    const title = formData.get('title');

    if(!title) return;

    const newTodo = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({
        title,
        completed: false,
        userId: 1
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res=> res.json()) as Todo;

    const newTodos = todos ? [...todos, newTodo] : [newTodo];

    setTodos(newTodos);
  }

  function handleAfterDeleteTodo(todo: Todo) {
    const newTodos = todos!.filter((t) => t !== todo);
    setTodos(newTodos);
  }

  // if(!todos) {
  //   return <strong>Loading ...</strong>;
  // }

  
  // const list = [];
  // if(todos) {
  //   for(const todo of todos) {
  //     list.push(<li key={todo.id}>{todo.title}</li>);
  //   }
  // }
  return (
    <>
      <h1>Todos</h1>

      <form action={handleAddTodo}>
        <label htmlFor="title">What do you want to do?</label>
        <input type="text" name="title" id="title" placeholder="What do you want to do?" />
        <button type="submit">Add Todo Item</button>
      </form>

      {!todos && <strong>Loading ...</strong>}
      {todos && (
        <ul>
          {todos.map((t) => <TodoItem todo={t} key={t.id} onDeleteTodo={handleAfterDeleteTodo} />)}
        </ul>
      )}
    </>
  )
}


/**
 * RESTful web services/APIs
 * 
 * REpresentational State Transfer
 * 
 * Resources: /users, /todos, /products, /comments, /weather
 * GET    /users     -> list of all users
 * GET    /users/:id -> one specific user
 * POST   /users     -> will create a user from the body of the request
 * PUT    /users/:id -> update a user by replacing it with the one in the body (except for the id)
 * PATCH  /users/:id -> partial update of the properties specified in the body of the request
 * DELETE /users/:id -> deletes a user
 * 
 * CRUD: Create / Read (Retrieve) / Update / Delete
 * Create -> POST
 * Read   -> GET
 * Update -> PUT/PATCH
 * Delete -> DELETE
 * 
 * Responses:
 * 1xx -> Informational
 * 2xx -> Success   -> 200 - OK, 201 - Created
 * 3xx -> Redirects -> 304, 309
 * 4xx -> Client Error -> 404 - Not Found, 401 - Unauthorized, 403 - Not Allowed, 405 - Method Not Allowed, 400 - Bad Request, 418 - I'm a teapot
 * 5xx -> Server Error -> 500 - Internal Server Error, 502 - Bad Gateway
 * 
 * GraphQL
 * {
 *  todos: {
 *    "title",
 *    "completed",
 *    "users": {
 *        "fistName"
 *     }
 *  }
 * }
 */
