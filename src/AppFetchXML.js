import React, { Component } from 'react'

class App extends Component {
  state = {
    data: '',
  }

  // Code is invoked after the component is mounted/inserted into the DOM tree.
  componentDidMount() {
    const url = 'http://10.8.194.3:42001/?testDebian';
    let data = {username: 'example'};
    console.log(JSON.stringify(data)); // will be sting '{"username":"example"}'

    // body: '{"param1": "test"}', // data can be `string` or {object}!
    // If 'Content-Type': 'text/plain' in POST request then no CORS error!
    // If 'Content-Type': 'application/json' in POST request then Browser will reports CORS error:
    /*
    Access to fetch at 'http://10.8.194.3:42001/?testDebian' from origin 'http://unl.test:8080' has been blocked
    by CORS policy: Request header field content-type is not allowed by Access-Control-Allow-Headers in preflight response.
    Cross-Origin Read Blocking (CORB) blocked cross-origin response http://10.8.194.3:42001/?testDebian 
    with MIME type text/xml.
    See https://www.chromestatus.com/feature/5629709824032768 for more details.
    NB! If mode: 'no-cors' used then error wll be:
    Cross-Origin Read Blocking (CORB) blocked cross-origin response http://10.8.194.3:42001/?testDebian 
    with MIME type text/xml. See https://www.chromestatus.com/feature/5629709824032768 for more details.
    Also
    Cross-Origin Read Blocking (CORB) blocked cross-origin response http://10.8.194.3:42001/?testDebian with MIME type
     application/json. See https://www.chromestatus.com/feature/5629709824032768 for more details.

    mode: 'no-cors', // no-cors, cors, *same-origin
    */
    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'text/plain'
      }
    })
    .then(result => {
      // result is fetch(url) Response object
      console.log(result)
      return result.text() // return result.json()
    })
    .then(result => {
      // result is JSON array.
      console.log(result)
      this.setState({
        data: result,
      })
    })
  
    /*
    fetch(url)
    .then(result => {
      // result is fetch(url) Response object
      console.log(result)
      return result.text() // return result.json()
    })
    .then(result => {
      // result is JSON array.
      console.log(result)
      this.setState({
        data: result,
      })
    })
    */
  
  }

/*
    render () {
    const result = data.map((entry, index) => {
      return <li key={index}>{entry}</li>
    })

    return <ul>{result}</ul>
    }
    */
   
   render() {
    const { data } = this.state
    return <div>
      <h1>Text data received from server:</h1>
      <p>{data}</p>
    </div>
  }
}

export default App