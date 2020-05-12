import React from 'react'
import TodoListItem from '../TodoListItem'
import './todo-list.css'

const TodoList =( {
                  todos,
                  onDeleted,
                  onToggleDone,
                  onToggleImportant}) => {

  const elements = todos.map((elem) => {
    const {id, ...otherProps} = elem
    return(
      <li key = {id} className ='list-group-item'>
          <TodoListItem
            {...otherProps}
            onDeleted = {()=>onDeleted(id)}
            onToggleDone = {() => onToggleDone(id)}
            onToggleImportant = {() => onToggleImportant(id)}
            />
      </li>
    )
  })

  return (
    <ul className = 'list-group todo-list'>
        {elements}
    </ul>
  )
}

export default TodoList
