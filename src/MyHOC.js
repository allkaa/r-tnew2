import React, { Component } from 'react'

var newData = {
  dataIni: 'Data from HOC initial...',
}

const MyHOC = ComposedComponent => class extends React.Component {
   constructor(props) {
      console.log('MyHOC constructor initial props before super(props)')
      console.log(props)
      super(props) // call the super class constructor and pass to it the props parameter
      console.log('MyHOC constructor initial props after super(props)')
      console.log(props)
   }
   componentDidMount() {
     this.setState({
        data: newData.dataIni
     });
  }
  render() {
   console.log('========> MyHOC render <==========')
   console.log(this.props);
   console.log(this.state);
   let objTest = {...this.props}
   console.log(objTest);
   return <ComposedComponent {...this.props} {...this.state} />;
  }
};
class MyComponent extends React.Component {
  render() {
   console.log('========> MyHOC-MyComponents render <==========')
   console.log(this.props);
   return (
        <div>
           <h1>{this.props.data}</h1>
        </div>
   )
  }
}

export default MyHOC(MyComponent);