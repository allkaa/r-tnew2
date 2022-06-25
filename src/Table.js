// Custom class component - Table using simple sub-components.
import React, { Component } from 'react'

/*
// Samples SimpleComponent vs. ClassComponent
const SimpleComponent = () => {
  return <div>Example</div>
}

class ClassComponent extends Component {
  render() {
    return <div>Example</div>
  }
}

// Note that if the return is contained the one line only, it does not need parentheses.
// A class component must include render(), and the return statement can only return ONE parent element:
*/

// Simple components:
const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Job</th>
      </tr>
    </thead>
  )
}

const TableBody = props => {
  const rows = props.characterData.map((row, index) => {
    console.log('TableBody index, row.name, row.job')
    console.log(index, row.name, row.job)

    // key={index} must be used for unique row identification.
    return (
      <tr key={index}>
        <td>{row.name}</td>
        <td>{row.job}</td>
        <td>
          <button onClick={() => props.removeRow(index)}>Delete row</button>
        </td>
      </tr>    
    )
  })

  return <tbody>{rows}</tbody>
}

// Class component that uses simple (sub-)components.
// A class component must include render(), and the return can only return ONE parent element:

class Table extends Component {
  // We'll need the constructor() to use `this`, and to receive the props of the parent.
  constructor(props) {
    super(props)
    console.log('Table constructor props')
    console.log(props)

    console.log('Table constructor this.state')
    console.log(this.state)
  }
  // A class component must include render(), and the return statement can only return ONE parent element:
  render() {
    const { characterData, removeRow } = this.props

    return (
      <table>
        <TableHeader />
        <TableBody characterData={characterData} removeRow={removeRow} />
      </table>
    )
  }
}

/*
class Table extends Component {
  render() {
    const { characterData } = this.props
    console.log(characterData)

    return (
      <table>
        <TableHeader />
        <TableBody characterData={characterData} />
      </table>
    )
  }
}
*/

/* Initial:

const TableBody = () => {
  return (
    <tbody>
      <tr>
        <td>Charlie</td>
        <td>Janitor</td>
      </tr>
      <tr>
        <td>MacMillian</td>
        <td>Bouncer</td>
      </tr>
      <tr>
        <td>Dee</td>
        <td>Aspiring actress</td>
      </tr>
      <tr>
        <td>Dennis</td>
        <td>Bartender</td>
      </tr>
    </tbody>
  )
}

class Table extends Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Job</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Charlie</td>
            <td>Janitor</td>
          </tr>
          <tr>
            <td>Mac</td>
            <td>Bouncer</td>
          </tr>
          <tr>
            <td>Dee</td>
            <td>Aspiring actress</td>
          </tr>
          <tr>
            <td>Dennis</td>
            <td>Bartender</td>
          </tr>
        </tbody>
      </table>
    )
  }
}
*/

export default Table