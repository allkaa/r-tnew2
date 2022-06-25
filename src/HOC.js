// HOC.js

import React, {Component} from 'react';

/*
export default function Hoc(HocComponent){
    return class extends Component{
        render(){
            return (
                <div>
                    <HocComponent></HocComponent>
                </div>

            );
        }
    } 
}
*/

export default function Hoc(HocComponent, data){
    return class extends Component{
        constructor(props) {
            super(props);
            this.state = {
                data: data
            };
        }
        
        render(){
            console.log('HOC this.state.data:');
            console.log(this.state.data);
            let ttt = {...this.props};
            console.log('HOC ...this.props:');
            console.log(ttt);
            console.log('HOC this.props:');
            console.log(this.props);
        return (
              <div>
                {/* spread iterable object ...this.props syntax for fuction call {...this.props}  used to get children if any */}
                <HocComponent data={this.state.data} {...this.props} />
              </div>
            );
        }
    } 
}