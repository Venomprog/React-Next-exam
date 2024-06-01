import { configureStore } from '@reduxjs/toolkit';

// import todos from '../redux/slices/todosSlice';
// import filters from '../redux/slices/filtersSlice';
// import filters from '../../app/ui/FilterList/filtersSlice';


const stringMiddleware = (store : any) => (next : any) => (action : any) => { //можно считать что вместо next у нас dispatch (next потому что будет вызываться новый диспетч в след за другим)
  if (typeof action === 'string'){
    return next({
      type: action
    })
  } else {
    return next(action)
  }
}

const store = configureStore({
  reducer: {},
  // reducer: {todos, filters},
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
})

export default store;
