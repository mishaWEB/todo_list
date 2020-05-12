import React, { Component} from 'react'
import './AddItem.css'


export default class AddItem extends Component  {

  state = {
    label: ' '
  }

onLabelChange = (e) => {
  this.setState({
    label: e.target.value
  })
}

  onSubmit = (e)=> {
    e.preventDefault();
      this.props.onAddItemForm(this.state.label)
      this.setState({
        label: ''
      })
  }
  render() {

    return (

            <form className = 'item-add-form d-flex'
                  onSubmit = {this.onSubmit}>
                <input type ='text'
                        onChange = {this.onLabelChange}
                        className = 'form-control'
                        placeholder = 'what need to fill'
                        value ={this.state.label}/>
                <button className = 'btn btn-outline-secondary'
              > Добавить задачу </button>
            </form>
    )
  }

}
