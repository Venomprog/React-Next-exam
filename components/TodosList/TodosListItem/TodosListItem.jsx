import React from 'react';

const TodosListItem = (props) => {

  const {userId, title, completed} = props;
  
  return (
    <div className='todos-list__item'>
      <div className="todos-list__item-user">
        User: {userId}
      </div>
      <div className="todos-list__item-title">
        Task: {title}
      </div>
      <div className={completed ? 'todos-list__item-completed _completed' : 'todos-list__item-completed'}>
        Completed: {completed ? 'Yes' : 'no'}
      </div>
    </div>
  );
};

export default TodosListItem;