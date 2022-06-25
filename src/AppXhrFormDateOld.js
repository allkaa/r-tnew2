import React, { Component } from 'react'

class App extends Component {
  state = {
    data: '',
  }

  // Code is invoked after the component is mounted/inserted into the DOM tree.
  componentDidMount() {
    let txtErr 
    //let objThis = this
    const xhr = new XMLHttpRequest();
    /*
    xhr.open('GET', 'http://10.8.194.3:42001/?testDebian', true);
    */
    xhr.open('POST', 'http://10.8.194.3:42001/?testDebian', true);
    // If specified, responseType must be empty string or "document"
    xhr.responseType = 'document';
    // Force the response to be parsed as XML
    xhr.overrideMimeType('text/xml');
    

    ///* GET or PUT state case using onload event.
    xhr.onload = () => {
      console.log(xhr.getAllResponseHeaders());
      let docXml
      if (xhr.readyState === xhr.DONE && xhr.status === 200) {
        //console.log(xhr.response);
        docXml = xhr.responseXML
        //console.log(docXml);
        let xmlS = new XMLSerializer();
        let xmlString = xmlS.serializeToString(docXml);
        console.log(xmlString)
        let nodeValue = docXml.getElementsByTagName("result")[0].childNodes[0].nodeValue; // get <result> tag text value.
        let nodeValue2 = docXml.getElementsByTagName("comment")[0].childNodes[0].nodeValue; // get <comment> tag text value.
        this.setState({
          //data: xmlString,
          data: `result = ${nodeValue}, comment = ${nodeValue2}`
        })
      }
      else {
        txtErr = `Request onload error - status ${xhr.status}, readyState ${xhr.readyState}`
        console.log(txtErr)
        this.setState({ data: txtErr,})
        }
    }
    //*/

    /*
    // GET or PUT case using onreadystatechange event;
    xhr.onreadystatechange = () => { // Call a function when the state changes.
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        // Request finished. Do processing here.
        console.log(xhr.getAllResponseHeaders());
        let docXml
        //console.log(xhr.response);
        docXml = xhr.responseXML
        //console.log(docXml);
        let xmlS = new XMLSerializer();
        let xmlString = xmlS.serializeToString(docXml);
        console.log(xmlString)
        let nodeValue = docXml.getElementsByTagName("result")[0].childNodes[0].nodeValue; // get <result> tag text value.
        let nodeValue2 = docXml.getElementsByTagName("comment")[0].childNodes[0].nodeValue; // get <comment> tag text value.
        this.setState({
        //data: xmlString,
        data: `result = ${nodeValue}, comment = ${nodeValue2}`
        })
      }
      else {
        txtErr = `Request onreadystate event - status ${xhr.status}, readyState ${xhr.readyState}`
        console.log(txtErr)
        this.setState({ data: txtErr,})
      }
    }
    */

    xhr.onerror = () => {
      txtErr = `Request failed -> onerror event occured.`
      console.log(txtErr)
      this.setState({ data: txtErr,})
  }
    
    xhr.ontimeout = () => {
      txtErr = `Request failed -> ontimeout event occured`
      console.log(txtErr)
      this.setState({ data: txtErr,})
    }

    //xhr.send(); // for GET case with empty body.

    // PUT case:
    //Send the proper header information along with the request
    //xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //xhr.setRequestHeader("Content-Type", "text/plain");
    //xhr.send("foo=bar&lorem=ipsum"); // send with body for POST.
    // xhr.send(new Int8Array()); 
    // xhr.send(document);


    let data = {test:'ok'};
    var urlEncodedData = "";
    var urlEncodedDataPairs = [];
    var name;
  
    // Turn the data object into an array of URL-encoded key/value pairs.
    for(name in data) {
      urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
    }
  
    // Combine the pairs into a single string and replace all %-encoded spaces to 
    // the '+' character; matches the behaviour of browser form submissions.
    urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');
  
    // Define what happens on successful data submission
    xhr.addEventListener('load', function(event) {
      alert('Yeah! Data sent and response loaded.');
    });
  
    // Define what happens in case of error
    xhr.addEventListener('error', function(event) {
      alert('Oops! Something goes wrong.');
    });
  
    // Set up our request
    xhr.open('POST', 'https://example.com/cors.php');
  
    // Add the required HTTP header for form data POST requests
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  
    // Finally, send our data.
    xhr.send(urlEncodedData);

  } // end of componentDidMount.
  
  render() {
    const { data } = this.state
    return <p>{data}</p>

    //const result = data.map((entry, index) => {
    //  return <li key={index}>{entry}</li>
    //})
    //return <ul>{result}</ul>
  }
}

export default App