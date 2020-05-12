import React, {Component} from 'react';
import './App.css';
import AppHeader from './components/AppHeader';
import SearchPanel from './components/SearchPanel';
import TodoList from './components/TodoList';
import ItemStatusFilter from './components/ItemStatusFilter'
import AddItem from './components/AddItem'


export default class App extends Component{

   maxId = 100;

  state = {
    todoData : [
      this.createTodoItem ('Попить чай'),
      this.createTodoItem ('Выучить Реакт'),
      this.createTodoItem ('Помыть Кирентия')
    ],
    term:'',
    filter:'all'
  }

  createTodoItem (label) {
    return {
      label,
      important:false,
      done:false,
      id:this.maxId++,
    }
  }

  deleteItem = (id) => {
    this.setState(({todoData})=> {
      const idx = todoData.findIndex((el) => el.id === id)
      const newArray = [
        ...todoData.slice(0,idx),
        ...todoData.slice(idx+1)
      ]

      return {
        todoData: newArray
      }
    })
  }

  onAddItem = (label) => {

    const newItem = this.createTodoItem(label)

    this.setState (({todoData}) => {

        const newArr = [
          ...todoData,
          newItem
        ]

        return {
          todoData:newArr
        }
    })

  }

  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
        const idx = todoData.findIndex((el) => el.id === id)
        const oldItem = todoData[idx]
        const newItem = {...oldItem, important: !oldItem.important}

        const newArr = [
          ...todoData.slice(0,idx),
          newItem,
          ...todoData.slice(idx+1)
        ]
        return {
          todoData:newArr
        }
    })
  }

  onToggleDone = (id) => {
    this.setState(({todoData}) => {
        const idx = todoData.findIndex((el) => el.id === id)
        const oldItem = todoData[idx]
        const newItem = {...oldItem, done: !oldItem.done}

        const newArr = [
          ...todoData.slice(0,idx),
          newItem,
          ...todoData.slice(idx+1)
        ]
        return {
          todoData:newArr
        }
    })
  }

onChangeSearch = (term) => {
  this.setState({
  term
  })
}


filterItem =(items, filter) => {
      switch (filter) {
        case 'all':
                return items
        case 'active':
                return items.filter((item) => !item.done)
        case 'done':
                return items.filter((item) => item.done)
        default:
                return items

      }
}

search(arr, term) {
  if( term === 0) {
    return arr
  }
  return arr.filter((elem) => elem.label.toLowerCase().includes(term.toLowerCase()))
};

onFilterChange = (filter) => {
  this.setState ({filter})
}
render(){

  const doneCount = this.state.todoData.filter((el) => el.done).length;

  const todoCount = this.state.todoData.length - doneCount

  const visibilities = this.filterItem(
    this.search(this.state.todoData, this.state.term),
    this.state.filter)

  return (
    <div className="todo-app">
      <AppHeader  toDo = {todoCount} done = {doneCount}/>
      <div className="top-panel d-flex">
        <SearchPanel   onChangeSearch = {this.onChangeSearch} />
        <ItemStatusFilter  filter = {this.state.filter}
         onFilterChange = {this.onFilterChange}
    />
      </div>
      <TodoList
      todos = {visibilities}
      onDeleted = {this.deleteItem}
      onToggleDone = {this.onToggleDone}
      onToggleImportant = {this.onToggleImportant}/>
      <AddItem  onAddItemForm = {this.onAddItem}/>
    </div>
  );
}

}
