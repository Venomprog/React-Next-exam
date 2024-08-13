"use client"

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filtersChanging, fetchFilters, selectedFiltersChanging, selectedFiltersRemove, filterCompletedChanging} from '@lib/filtersSlice';
import { useEffect } from 'react';
import { TypeTodo } from '@lib/types/types';

const FiltersList: React.FC = () => {
  type checkedFilter = {
    filterItem: number | string
  }

  const filters = useSelector(state => state.filters.filters);
  const dispatch = useDispatch();
  let checkedFilters: checkedFilter[] = [];

  useEffect(() => {
    dispatch(fetchFilters());
  }, []);

  const filterTodos = (filter: checkedFilter) => {
    dispatch(filtersChanging(filter))
  }

  const addCheckFilters = (event, filter) => {
    event.stopPropagation();
    const input = event.target
    if (input.checked) {
      if (filter === 'completed'){
        dispatch(filterCompletedChanging(true))
      } else {
        checkedFilters.push(filter)
        dispatch(selectedFiltersChanging(filter));
      }
    } else {
      if (filter === 'completed'){
        dispatch(filterCompletedChanging(false))
      } else {
        const newArr = checkedFilters.filter(item => item !== filter)
        checkedFilters = newArr;
        dispatch(selectedFiltersRemove(filter));
      }
    }

    // dispatch(selectedFiltersChanging(checkedFilters));
  }

  const renderFilters = (arr: TypeTodo[]) => {
    if (arr.length === 0){
      return
    }

    let newArr = [];

    for (let i = 0; i < arr.length; i++){
      newArr.push(arr[i].userId)
    }

    const newSetArr = Array.from(new Set(newArr));
    newSetArr.push('completed')

    return newSetArr.map((item, i) => {
      return (
        <label className='checkbox-label' onClick={(e) => addCheckFilters(e, item)} key={i}>
          <input type='checkbox' className='checkbox-input' />
          <p>Фильтровать по {item}</p>
        </label>
      ) 
    })
  }

  const elements = renderFilters(filters)

  return (
    <div className='todos-filters'>
      {elements}
    </div>
  );
};

export default FiltersList;