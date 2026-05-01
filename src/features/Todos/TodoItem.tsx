import type { Todo } from "./types";

type Props = {
    todo: Todo;
    onToggle: (todo: Todo) => void;
    onDelete: (id: number) => void;
};

export function TodoItem({ todo, onToggle, onDelete }: Props) {
    return (
        <li>
            <label>
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo)}
                />

                <span
                    style={{
                        textDecoration: todo.completed ? "line-through" : "none",
                    }}
                >
                    {todo.title}
                </span>
            </label>

            <button onClick={() => onDelete(todo.id)}>Delete</button>
        </li>
    );
}