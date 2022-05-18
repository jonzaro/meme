import logo from "./logo.svg";
import "./style.css";
import React from "react";
import Header from "./components/Header";
import Meme from "./components/Meme";
import GeneratedMemes from "./components/GeneratedMemes";

function App() {
  const [things, setThings] = React.useState(["Thing 1", "Thing 2"]);

  return (
    <div className="App">
      <Header />
      <Meme />
      {/* <GeneratedMemes /> */}
    </div>
  );
}

export default App;
