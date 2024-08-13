import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useRequest} from '@lib/useRequest'
import {IStateTodos} from '@lib/types/initialState'
import { TypeTodo } from "./types/types";
import axios, {isCancel, AxiosError} from 'axios';
import * as AxiosLogger from 'axios-logger';

console.log(axios.isCancel('something'));
const instance = axios.create();
instance.interceptors.request.use(AxiosLogger.requestLogger);
instance.interceptors.response.use(AxiosLogger.responseLogger);

const initialState: IStateTodos = {
  todos: [],
}


export const fetchTodos = createAsyncThunk<TypeTodo[], void, { rejectValue: { error: string } }>(
  'todos/fetchTodos',
  async() => {

    try {
      const response = await instance.get('https://jsonplaceholder.typicode.com/todos');

      console.log('response', new Date)
      console.log(response)
      return response.data
    } catch (error) {
      console.error(error);
    }

    // const {request} = useRequest();

    //Возвращает response.data (массив объектов)
    // return request("https://jsonplaceholder.typicode.com/todos")
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