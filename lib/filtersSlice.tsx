import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useRequest} from './useRequest'

const initialState = {
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

export const fetchFilters = createAsyncThunk(
  'filters/fetchFilters',
  () => {
    const {request} = useRequest();
    return request("https://jsonplaceholder.typicode.com/todos")
  }
);
// export const fetchAllTodos = createAsyncThunk(
//   'filters/fetchFilters',
//   () => {
//     const {request} = useRequest();
//     return request("https://jsonplaceholder.typicode.com/todos")
//   }
// );

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    filtersChanging: (state, action) => {
      state.activeFilter = action.payload
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
  filterCompletedChanging
} = actions