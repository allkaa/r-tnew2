import React from 'react';
//import ReactDOM from 'react-dom';
import {
   BrowserRouter as Router,
   Switch,
   Route,
   Link
 } from "react-router-dom";
import Home from './Home.js';
import About from './About.js';
import Contact from './Contact.js';

export default function App() {
   return (
     <Router>
       <div>
         <nav>
           <ul>
             <li>
               <Link to="/">Home</Link>
             </li>
             <li>
               <Link to="/about">About</Link>
             </li>
             <li>
               <Link to="/contact">Contact</Link>
             </li>
           </ul>
         </nav>
 
         {/* A <Switch> looks through its children <Route>s and
             renders the first one that matches the current URL. */}
         <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
         </Switch>
       </div>
     </Router>
   );
 }
 //export default App;