import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useRequest} from './useRequest'
import {IStateFilters} from '@lib/types/initialState'
import axios, {isCancel, AxiosError} from 'axios';
import * as AxiosLogger from 'axios-logger';
import { TypeTodo } from './types/types';

console.log(axios.isCancel('something'));
const instance = axios.create();
instance.interceptors.request.use(AxiosLogger.requestLogger);
instance.interceptors.response.use(AxiosLogger.responseLogger);


type GetTodosResponse = {
  data: TypeTodo[];
};


const initialState: IStateFilters = {
  filters: [
    1,
    2,
    3,
    4,
    'all'
  ],
  selectedFilters: [],
  filterCompleted: false
}

export const fetchFilters = createAsyncThunk<TypeTodo[], void, { rejectValue: { error: string } }>(
  'filters/fetchFilters',
  async () => {
    // const {request} = useRequest();
    // return request("https://jsonplaceholder.typicode.com/todos")


    try {
      const response = await instance.get('https://jsonplaceholder.typicode.com/todos');

      console.log('response', new Date)
      console.log(response)
      return response.data
    } catch (error) {
      console.error(error);
    }
  }
);

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    filtersChanging: (state, action) => {
      // state.activeFilter = action.payload
    },
    filterCompletedChanging : (state, action) => {
      state.filterCompleted = action.payload
    },
    selectedFiltersChanging: (state, action) => {
      console.log(state.selectedFilters)
      if (action.payload === '') return
      state.selectedFilters = [...state.selectedFilters, action.payload]
    },
    selectedFiltersRemove: (state, action) => {
      if (action.payload === '') return
      state.selectedFilters = state.selectedFilters.filter(item => item !== action.payload)
    },
    filtersReset: (state, action) => {
      state.selectedFilters = []
      state.filterCompleted = false
    },

    filtersFetching: (state, action) => {

    },

  },
  extraReducers: (builder)  => {
    builder
          .addCase(fetchFilters.fulfilled, (state, action) => {
            state.filters = action.payload
          })
          .addDefaultCase(() => {})
  }
});


const {actions, reducer} = filtersSlice;

export default reducer;

export const {
  filtersChanging,
  filtersFetching,
  selectedFiltersChanging,
  selectedFiltersRemove,
  filterCompletedChanging,
  filtersReset
} = actions