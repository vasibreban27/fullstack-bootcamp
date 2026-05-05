import { FaTrashAlt } from "react-icons/fa";
import type { Todo } from './types';

type Props = {
  todo: Todo;
};

export function TodoItem({ todo }: Props) {
  function handleCompleteTodo(todo: Todo) {
    fetch(`/api/todos/${todo.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ completed: !todo.completed }),
      headers: {
        'Content-Type': 'application/json',
      },
    });    
  }

  function handleDeleteTodo(todo: Todo) {
    fetch(`/api/todos/${todo.id}`, {
      method: 'DELETE',
    });  
  }

  return (
    <li>
      <label>
        <input
          type="checkbox"
          defaultChecked={todo.completed}
          onChange={() => handleCompleteTodo(todo)}
        />{' '}
        {todo.title}
      </label>{' '}
      <button type="button" onClick={() => handleDeleteTodo(todo)}><FaTrashAlt /></button>
    </li>
  );
}
