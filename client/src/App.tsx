import { useState } from "react";
import {
  useAddTodo,
  useDeleteTodo,
  useTodos,
  useUpdateTodo,
} from "./queries/todos";

function App() {
  const [isAddTodoOpened, setIsAddTodoOpened] = useState(false);
  const [isUpdateTodoOpened, setIsUpdateTodoOpened] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<any>();
  const todos = useTodos();
  const addTodo = useAddTodo();
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();
  if (todos.isLoading) return <div>Loading...</div>;
  if (todos.isError) return <div>Error: {todos.error.message}</div>;
  return (
    <div>
      <div>
        <button onClick={() => setIsAddTodoOpened((prev) => !prev)} disabled= {isUpdateTodoOpened}>
          {isAddTodoOpened ? "Close" : "Add Todo"}
        </button>
      </div>
      {isAddTodoOpened ? (
        <div className="card">
          <h3>Add new todo </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const newTodo = {
                id: self.crypto.randomUUID() as string,
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                completed: false,
              };
              addTodo.mutate(newTodo as any);
            }}
          >
            <label htmlFor="title">Title:</label>
            <input name="title" placeholder="Title" required />
            <label htmlFor="description">Description:</label>
            <input name="description" placeholder="Description" required />
            <button type="submit">Add</button>
          </form>
        </div>
      ) : null}
      {isUpdateTodoOpened ? (
        <div className="card">
          <h2>Update Todo</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const updatedTodo = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                completed: formData.get("completed") === "on",
              };
              updateTodo.mutate({
                ...updatedTodo,
                id: selectedTodo.id,
              });
              setSelectedTodo(undefined);
              setIsUpdateTodoOpened(false);
              e.currentTarget.reset();
              console.log("Update todo", updatedTodo);
            }}
          >
            <label htmlFor="title">Title:</label>

            <input
              name="title"
              value={selectedTodo?.title}
              onChange={(e) =>
                setSelectedTodo((prev: any) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              placeholder="Title"
              required
            />
            <label htmlFor="description">Description:</label>
            <input
              name="description"
              value={selectedTodo?.description}
              onChange={(e) =>
                setSelectedTodo((prev: any) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Description"
              required
            />
            <label>
              Completed:
              <input
                type="checkbox"
                name="completed"
                checked={selectedTodo?.completed || false}
                onChange={(e) =>
                  setSelectedTodo((prev: any) => ({
                    ...prev,
                    completed: e.target.checked,
                  }))
                }
              />
            </label>
            <button onClick={()=> setIsUpdateTodoOpened(false)}>Close</button>
            <button type="submit">Update</button>
          </form>
        </div>
      ) : null}
      <div>
        <h2>Todos</h2>
        <div>
          {todos.data.map((todo: any) => (
            <div className="card" key={todo.id}>
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
              <p>
                <b>Status:</b> {todo.completed ? "Completed" : "Pending"}
              </p>
              <button
                onClick={() => {
                  setIsUpdateTodoOpened((prev) => !prev);
                  setSelectedTodo(todo);
                }}
                disabled={isAddTodoOpened}
              >
                Update
              </button>
              <button
                onClick={() => {
                  deleteTodo.mutate(todo.id);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default App;
