import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

let txn_id = 0;
let searchIni = "";

function MainFuncComponent(props) {
  console.log('Unl.js props:' + props);
  console.log(props); // {txn_id: 10000000}
  if (txn_id === 0) {
    txn_id = props.txn_id;
  }
  searchIni = props.searchIni;
  console.log('Unl.js searchIni = |' +searchIni + '|');
  return (
    <div className="App">
      <h1>Welcome to React Router test!</h1>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}

//export default App;
export default MainFuncComponent;

function Home() {
  return (
    <>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <nav>
        <Link to="/about">About</Link>
      </nav>
    </>
  );
}

function About() {
  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>
          That feels like an existential question, don't you
          think?
        </p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}