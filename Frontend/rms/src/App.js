import logo from './logo.svg';
import './App.css';
import React, { useEffect }  from "react";
import { useState } from "react";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
function printCustomers(data, setX) {

  setX(data.map((item, index) => {
  return ( 
      <tr>
          {item.name} {item.id}
      </tr>   
  )
}))
}

function App(){

  const [data, setData] = useState([]);
  const [X, setX] = useState(<></>);
  
  useEffect(() => {
      fetch('http://localhost:3001/')
      .then(res => res.json())
      .then(data => {
          console.log(data);
          printCustomers(data, setX);
          setData(data);
      })
  }, []);

  return (
      <div>
          {X}
      </div>
  )
}

export default App;
