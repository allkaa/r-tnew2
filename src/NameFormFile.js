// NB! Capitalize custom components name to differentiate them from regular HTML elements).
import React, { Component } from 'react'

// Custom Controlled Component:
class NameForm extends Component {
  constructor(props) {
    console.log('========> NameForm constructor <==========')
    super(props);
    this.state = {
      name:
        'Alex Raven',
      essay:
        '',
      fruit:
        ['Coconut','Lime'],
      checkOption:
        ['option1'],
      radioOption:
        'option1'
    }; // very initial value.
    // Create a ref to the DOM node to access file(s) in a submit handler:
    this.fileInput = React.createRef();

    console.log(this.state.name);
    console.log(this.state.essay);
    console.log(this.state.fruit);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Code is invoked after the component is mounted/inserted into the DOM tree.
  componentDidMount() {
    console.log('========> NameForm componentDidMount <==========')
    console.log(this.state.name);
    this.setState({name: this.state.name.toUpperCase()})
    console.log(this.state.name);
    console.log(this.state.essay);
    console.log(this.state.fruit);
    console.log(this.state.checkOption);
    console.log(this.state.radioOption);
  }

  handleSubmit(event) {
    console.log('========> NameFormFile handleSubmit <==========')
    console.log('event: ' + event);
    console.log(event);
    console.log('event.target: ' + event.target);
    console.log(event.target);
    console.log('event.target.name: ' + event.target.name);
    console.log(event.target.name);
    console.log('event.target.type: ' + event.target.type)
    console.log(event.target.type)
    console.log('event.target.value: ' + event.target.value);
    console.log(event.target.value);
    console.log(this.state);
    //alert('Name: "' + this.state.name + '" and an essay: "' + this.state.essay + '" and fruit: "' + this.state.fruit + '" were submitted.');
    event.preventDefault(); // prevent standard form submit to take control over.
    // Use created ref to the DOM node to access file(s) in a submit handler:
    alert(
      `Selected file to upload - ${
        this.fileInput.current.files[0].name
      }`
    );
    // Access the form element...
    let form = document.getElementById("myForm");
    // Bind the FormData object and the form element
    let FD = new FormData(form);

    let txtErr 
    //let objThis = this
    const xhr = new XMLHttpRequest();

    //xhr.open('GET', 'http://10.8.194.3:42001/?testDebian', true); // true is open async.
    //xhr.open('POST', 'http://10.8.194.3:42001/?testDebian', true);
    xhr.open('POST', 'http://unl.test:8081/fileupload', true);
    // If specified, responseType must be empty string, "text" or "document"
    //xhr.responseType = 'document';
    xhr.responseType = 'text';
    // Force the response to be parsed as XML
    //xhr.overrideMimeType('text/xml');
    //xhr.overrideMimeType('text/html');
    xhr.overrideMimeType('text/plain');

    // GET or PUT state case using onload event.
    xhr.onload = () => {
      console.log('========> FormFile event xhr.onload xhr.AllResponseHeaders<==========')
      console.log(xhr.getAllResponseHeaders());
      let docXml
      if (xhr.readyState === xhr.DONE && xhr.status === 200) {
        //console.log(xhr.response);
        /*
        docXml = xhr.responseXML
        //console.log(docXml);
        let xmlS = new XMLSerializer();
        let xmlString = xmlS.serializeToString(docXml);
        console.log('========> FormData event xhr.onload subevent xmlSting <==========')
        console.log(xmlString)
        let nodeValue = docXml.getElementsByTagName("result")[0].childNodes[0].nodeValue; // get <result> tag text value.
        let nodeValue2 = docXml.getElementsByTagName("comment")[0].childNodes[0].nodeValue; // get <comment> tag text value.
        */
        docXml = xhr.responseText;
        this.setState({
          //data: xmlString,
          essay: `Server reply: ${docXml}\nFile ${this.fileInput.current.files[0].name} uploaded.`
        })
        console.log('========> FormFile event xhr.onload xhr.responseText<==========')
        console.log(docXml);
      }
      else {
        txtErr = `Request onload error - status ${xhr.status}, readyState ${xhr.readyState}`
        console.log(txtErr)
        this.setState({ data: txtErr,})
        }
    }
    //

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

    console.log('========> FormDataFile submit event to send <==========')
    console.log(FD);
    // Send our FormData object; HTTP headers are set automatically!!!
    //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); <---- do not use with FD.
    xhr.send(FD);

  } // end of handleSubmit(event)

  // onSubmit={this.handleSubmit} action="http://unl.test:8081/fileupload" method="post" enctype="multipart/form-data"
  // formMethod="post" formAction="http://unl.test:8081/fileupload" enctype="multipart/form-data"
  render() {
    return (
    <div>

      <form id="myForm" onSubmit={this.handleSubmit}  action="http://unl.test:8081/fileupload" method="post" encType="multipart/form-data">
        <div>
          <label htmlFor="file_name">Upload file:: <abbr title="required">*</abbr> </label>
          <input type="file" id="file_name" name="filetoupload" ref={this.fileInput} />
        </div>
        <br/>
        <div className="button">
          {/* event target type will be submit */}
          <button type="submit">
            Upload file
          </button>
        </div>
      </form>
      <br/>
      <div>
        <label htmlFor="msg">Received from server:</label>
        <textarea id="msg" name="user_essay" defaultValue={this.state.essay} ></textarea> {/* for uncontrolled state use  defaultValue="Default textarea" */}
      </div>
      <br/>
      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d20333.535337350597!2d30.61040335!3d50.42821145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sua!4v1567495244815!5m2!1sen!2sua"
        width="600" height="450" frameBorder="0" style={{border:0}} allowFullScreen="" title="google map">
      </iframe>
      <iframe title="mdn" src="https://developer.mozilla.org/en-US/docs/Glossary"
        width="100%" height="500" frameBorder="0" allowFullScreen="" sandbox>
        <p> <a href="https://developer.mozilla.org/en-US/docs/Glossary">
          Fallback link for browsers that don't support iframes
          </a> 
        </p>
      </iframe>      

    </div> 
    );
  }
}

export default NameForm