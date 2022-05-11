import logo from './logo.svg';
import './style.css';
import React from "react"
import Header from "./components/Header.js"
import Meme from "./components/Meme.js"

function App() {
  const [things, setThings] = React.useState(["Thing 1", "Thing 2"])
  
  return (
    <div className="App">
      <Header />

      <Meme />

    </div>
  );
}

export default App;
