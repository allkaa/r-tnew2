import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import PropTypes from 'prop-types';

class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         data: ''
      }
      this.myRef = React.createRef(); // create empty ref construction.
      this.updateState = this.updateState.bind(this);
      this.clearInput = this.clearInput.bind(this);
   };
   updateState(e) {
      this.setState({data: e.target.value});
   }
   clearInput() {
      console.log('this.refs:')
      console.log(this.refs);
      this.setState({data: ''});
      console.log('this.myRef:')
      console.log(this.myRef);
      this.myRef.current.focus(); // ref to <input .../> is used to set focus, ref set in <input .../>
      //ReactDOM.findDOMNode(this.refs.myInput).focus(); // ref to <input .../> is used to set focus, ref set in <input .../>
   }
   render() {
      return (
         <div>
            {/* using ref (special React attribute) to set this.myRef.current to <input ... /> */}
            <input value = {this.state.data} onChange = {this.updateState} ref = {this.myRef}></input>
            {/* or using ref set this.refs.myInput to <input ... /> */}
            {/*<input value = {this.state.data} onChange = {this.updateState} ref = "myInput"></input>*/}
            <button type="button" onClick = {this.clearInput}>CLEAR</button>
            <h4>{this.state.data}</h4>
         </div>
      );
   }
}

export default App;