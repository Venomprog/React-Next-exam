import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useRequest} from './useRequest'


const initialState = {
  todos: [],
}


export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  () => {
    const {request} = useRequest();
    return request("https://jsonplaceholder.typicode.com/todos")
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todosFetching: (state, action) => {
      state.todos = action.payload
    },

  },
  extraReducers: (builder)  => {
    builder
          .addCase(fetchTodos.fulfilled, (state, action) => {
            state.todos = action.payload;
          })
          .addDefaultCase(() => {})
  }
});


const {actions, reducer} = todosSlice;

export default reducer;

export const {
  todosFetching,
} = actions