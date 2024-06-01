"use client"

import React, { useEffect, useId, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from '../../lib/todosSlice';
import TodosListItem from './TodosListItem/TodosListItem';
import { useRouter } from 'next/router';
// import './todosList.scss'
// import '../TodosList/todosList.scss'
import Link from 'next/link'

const TodosList = () => {
  const dispatch = useDispatch();
  const router = useRouter();


  const todosListAll = useSelector((state) => state.todos.todos)
  const activeFilter = useSelector((state) => state.filters.selectedFilters)
  const completedFilter = useSelector((state) => state.filters.filterCompleted);

  // let todosArr = [];
  // if (activeFilter === undefined){
  //   return
  // }
  // if (activeFilter.length === 0){
  //   return
  // }
  // for (let i = 0; i < activeFilter.length; i++){
  //   const filteredTodos = todosListAll.filter(item => item.userId === activeFilter[i]);
  //   todosArr = [...todosArr, ...filteredTodos];
  // }


  useEffect(() => {
    dispatch(fetchTodos());
  }, []);


  const checkFilters = (filter, todos) => {
    let todosArr = [];
    if (filter === undefined){
      return todos
    }
    if (filter.length === 0){
      if (completedFilter){
        const completedTodos = todos.filter(item => item.completed === true);
        return completedTodos
      }
      return todos
    }
    for (let i = 0; i < filter.length; i++){
      const filteredTodos = todos.filter(item => item.userId === filter[i]);
      todosArr = [...todosArr, ...filteredTodos];
    }

    if (completedFilter){
      const completedTodos = todosArr.filter(item => item.completed === true);
      return completedTodos
    }

    return todosArr
  }

  const testingArr = checkFilters(activeFilter, todosListAll)

  const handleNavigateDetail = (id, userId, title) => {
    router.push({
      pathname: `/todos/todos-${id}`,
      // pathname: `./task-${id}`,
      query: { id: id, userId: userId, title },
    })
  }

  const renderItems = (arr) => {
    if (arr === undefined) return
    if (arr.length === 0){
      return
    }

    return arr.map(({id, userId, ...props}) => {
      const {title} = props
      return (
        <div 
          key={id}
          onClick={() => handleNavigateDetail(id, userId, title)}
        >
          <TodosListItem key={id} userId={userId} {...props}/>
        </div>


        // <Link href={`/tasks/task-${id}`} key={id} passHref >
        //   <TodosListItem key={id} userId={userId} {...props}/>
        // </Link>
      )
      
    })

  }



  // const elements = renderItems(filteredTodos)
  // const elements = renderItems(todosListAll)
  const elements = renderItems(testingArr)

  return (
    <div className='todos-list'>
      {elements}
    </div>
  );
};

export default TodosList;