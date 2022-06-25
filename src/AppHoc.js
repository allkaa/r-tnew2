// App.js

/*
import React, { Component } from 'react';
import Hoc from './HOC';

class App extends Component {
  
  render() {
    return (
      <div>
        Higher-Order Component Tutorial from App as HOC component.
      </div>
    )
  }
}
//App = Hoc(App);
*/

import React, { Component } from 'react';
import StockList from './StockList';
import UserList from './UserList';
import Hoc from './HOC';

const StocksData = [
  {
      id: 1,
      name: 'TCS'
        
  },
  {
      id: 2,
      name: 'Infosys'
  },
  {
      id: 3,
      name: 'Reliance'
  }
];
const UsersData = [
  {
      id: 1,
      name: 'Krunal'
        
  },
  {
      id: 2,
      name: 'Ankit'
  },
  {
      id: 3,
      name: 'Rushabh'
  }
];

const Stocks = Hoc(
  StockList,
  StocksData
);

const Users = Hoc(
  UserList,
  UsersData
);


class App extends Component {
  
  render() {
    return (
      <div>
        <Stocks>
           <p>Paragraph text1 as child 1</p>
           <p>Paragraph text2 as child 2</p>
        </Stocks>
        <Users></Users>
      </div>
    )
  }
}

export default App;