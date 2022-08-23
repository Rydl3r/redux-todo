import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ITodo } from "./ITodo";

export interface TodosState {
  value: ITodo[];
}

const initialState: TodosState = {
  value: [],
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITodo>) => {
      state.value.push({
        id: action.payload.id,
        title: action.payload.title,
        completed: action.payload.completed,
      });
    },
    editTodo: (state, action: PayloadAction<ITodo>) => {
      state.value = state.value.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            id: action.payload.id,
            title: action.payload.title,
            completed: action.payload.completed,
          };
        }
        return todo;
      });
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter((todo) => todo.id !== action.payload);
    },
    toggleCompleted: (state, action: PayloadAction<number>) => {
      state.value = state.value.map((todo) => {
        if (todo.id === action.payload) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
    },
  },
});

export const { addTodo, editTodo, removeTodo, toggleCompleted } =
  todosSlice.actions;

export const selectTodos = (state: RootState) => state.todos.value;

export default todosSlice.reducer;
