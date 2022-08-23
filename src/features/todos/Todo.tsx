import { useState } from "react";

import { useAppDispatch } from "../../app/hooks";
import { ITodo } from "./ITodo";
import { editTodo, removeTodo, toggleCompleted } from "./todosSlice";

export function Todo(props: { todo: ITodo }): JSX.Element {
  const dispatch = useAppDispatch();
  const title: string =
    props.todo.title.length > 12
      ? props.todo.title.slice(0, 12) + "..."
      : props.todo.title;

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [todoInput, setTodoInput] = useState<string>(props.todo.title);

  const startEditing = (): void => {
    setIsEditing(true);
  };

  const cancelEditing = (): void => {
    setIsEditing(false);
    setTodoInput(props.todo.title);
  };

  const finishEditing = (): void => {
    if (todoInput.length > 0) {
      dispatch(
        editTodo({
          id: props.todo.id,
          title: todoInput,
          completed: props.todo.completed,
        })
      );
      setIsEditing(false);
    } else {
      alert("Please enter a todo");
    }
  };

  const toggleCompletedHandler = (): void => {
    dispatch(toggleCompleted(props.todo.id));
  };

  const deleteTodoHandler = (): void => {
    dispatch(removeTodo(props.todo.id));
  };

  return (
    <div key={props.todo.id} className="todo">
      <input
        className="todoCheckbox"
        type="checkbox"
        checked={props.todo.completed}
        onChange={() => toggleCompletedHandler()}
      />

      {isEditing ? (
        <input
          className="editTodoInput"
          aria-label="Input todo"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
        />
      ) : (
        <span className="todoTitle" onDoubleClick={() => startEditing()}>
          {title}
        </span>
      )}
      {isEditing ? (
        <div>
          <button className="todoButton" onClick={() => finishEditing()}>
            Save
          </button>
          <button className="todoButton" onClick={() => cancelEditing()}>
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <button className="todoButton" onClick={() => startEditing()}>
            Edit
          </button>
          <button className="todoButton" onClick={() => deleteTodoHandler()}>
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
