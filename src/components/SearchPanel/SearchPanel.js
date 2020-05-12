import React from 'react'
import './search-panel.css';


export default class SearchPanel extends React.Component  {

    state = {
      term: ''
    }

    onChangeSearch = (e) => {
      const term = e.target.value
      this.setState({
        term
      })

      this.props.onChangeSearch(term)
    }
    render() {
      return (

         <input type="text"
                   className="form-control search-input"
                   placeholder="type to search"
                   onChange = {this.onChangeSearch}
                   value = {this.state.term}
                   />
       );
    }



}
