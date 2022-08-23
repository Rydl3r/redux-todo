import { useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Todo } from "./Todo";
import { addTodo, selectTodos } from "./todosSlice";
import { ITodo } from "./ITodo";

export function Todos(): JSX.Element {
  const todos = useAppSelector(selectTodos);
  const dispatch = useAppDispatch();

  const [todoInput, setTodoInput] = useState<string>("");

  const addTodoHandler = (): void => {
    if (todoInput.length > 0) {
      dispatch(
        addTodo({
          id: Math.floor(Math.random() * 100000),
          title: todoInput,
          completed: false,
        })
      );
      setTodoInput("");
    } else {
      alert("Please enter a todo");
    }
  };

  return (
    <div className="todos">
      <h1 className="title">Your Todos List</h1>
      <div className="addTodo">
        <input
          className="todoInput"
          aria-label="Input todo"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
          placeholder="Add a todo"
        />
        <button className="todoButton" onClick={() => addTodoHandler()}>
          Add Todo
        </button>
      </div>
      <div className="todosWrapper">
        {todos.map((todo: ITodo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
}
