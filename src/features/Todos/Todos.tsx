import { useEffect, useState } from "react";
import type { Todo } from "./types";
import { TodoItem } from "./TodoItem";

const apiUrl = "http://localhost:3000/";

export function Todos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchTodos();
    }, []);

    async function fetchTodos() {
        try {
            setLoading(true);

            const res = await fetch(`${apiUrl}todos`);

            if (!res.ok) {
                throw new Error("Failed to fetch todos");
            }

            const data: Todo[] = await res.json();
            setTodos(data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    }

    async function handleAddTodo(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const title = formData.get("title");

        if (!title || typeof title !== "string") {
            return;
        }

        const trimmedTitle = title.trim();

        if (!trimmedTitle) {
            return;
        }

        try {
            const res = await fetch(`${apiUrl}todos`, {
                method: "POST",
                body: JSON.stringify({
                    title: trimmedTitle,
                    completed: false,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error("Failed to add todo");
            }

            const newTodo: Todo = await res.json();

            setTodos((currentTodos) => [...currentTodos, newTodo]);

            e.currentTarget.reset();
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
        }
    }

    async function handleToggleTodo(todo: Todo) {
        try {
            const res = await fetch(`${apiUrl}todos/${todo.id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    completed: !todo.completed,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error("Failed to update todo");
            }

            const updatedTodo: Todo = await res.json();

            setTodos((currentTodos) =>
                currentTodos.map((t) =>
                    t.id === updatedTodo.id ? updatedTodo : t
                )
            );
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
        }
    }

    async function handleDeleteTodo(id: number) {
        try {
            const res = await fetch(`${apiUrl}todos/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Failed to delete todo");
            }

            setTodos((currentTodos) =>
                currentTodos.filter((todo) => todo.id !== id)
            );
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
        }
    }

    if (loading) {
        return <strong>Loading...</strong>;
    }

    return (
        <>
            <h1>Todos</h1>

            <form onSubmit={handleAddTodo}>
                <label htmlFor="title">What do you want to do?</label>

                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="What do you want to do?"
                />

                <button type="submit">Add</button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <ul>
                {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={handleToggleTodo}
                        onDelete={handleDeleteTodo}
                    />
                ))}
            </ul>
        </>
    );
}