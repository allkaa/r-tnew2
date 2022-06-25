'use strict' // use strict is unnecessary inside of modules.
import React, { Component } from 'react'

class Form extends Component {
  // We'll need the constructor() to use `this`, and to receive the props of the parent.
  constructor(props) {
    super(props)
    console.log('Form constructor props')
    console.log(props)

    this.initialState = {
      name: '',
      job: '',
    }

    console.log('Form constructor this.initialState')
    console.log(this.initialState)
    console.log('Form constructor this.state before setting from this.initialState')
    console.log(this.state)
    this.state = this.initialState // set Form this.state directly without re-rendering.
    console.log('Form constructor this.state after setting from this.initialState')
    console.log(this.state)
  }

  handleChange = event => {
    const { name, value } = event.target
    console.log('Form handeChange event event.target')
    console.log(event.target)
    
    console.log('Form handeChange event this.state before setting event {name: value}')
    console.log(this.state)
    this.setState({ // set Form this.state asyn and trigger re-rendering with childs.
      [name]: value,
    })
    console.log('Form handeChange event this.state after asyn setting event {name: value}')
    console.log(this.state)
    //console.log('Form handeChange event this.initialState')
    //console.log(this.initialState)
  }

  submitForm = () => {
    console.log('Form submitForm event this.state before calling handleSubmit')
    console.log(this.state)
    this.props.handleSubmit(this.state) // call App handleFormSubmit() with Form this.state.
    console.log('Form submitForm event this.state after calling handleSubmit')
    console.log(this.state)
    this.setState(this.initialState) // asyn set Form this.state to initial and trigger re-rendering with childs.
    console.log('Form submitForm event this.state after asyn reset to this.initalState')
    console.log(this.state)
    //console.log('Form submitForm event this.initialState')
    //console.log(this.initialState)
  }
  // A class component must include render(), and the return statement can only return ONE parent element:
  render() {
    const { name, job } = this.state;
    // Render or re-render Form form.
    // Using an onClick instead of onSubmit since we're not using the standard submit functionality.
    return (
      <form>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={this.handleChange} />
        <label>Job</label>
        <input
          type="text"
          name="job"
          value={job}
          onChange={this.handleChange} />
        <input type="button" value="Submit" onClick={this.submitForm} />
      </form>
    );
  }
}

export default Form