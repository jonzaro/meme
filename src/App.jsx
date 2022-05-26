import logo from "./logo.svg";
import "./style.css";
import React, {useState} from 'react'
import Header from "./components/Header";
import MemeMaker from "./components/MemeMaker";
import MemeEdits from "./components/MemeEdits";
import { v4 as uuidv4 } from 'uuid';




function App(props) {
    const [memeList, setMemeList] = useState([])

    const updateMemeItem = (id, updatedItem) => { 
      setMemeList(prevMemeList => { 
          return prevMemeList.map((item)=> { 
              if (item.id === id) { 
                  return updatedItem
              }
              else {
                  return item
              }
          })
      })
  }

  const addNewItem = (newItem) => {
    newItem.id = uuidv4()
    setMemeList(prev=>[...prev, newItem])
  }

  function deleteMemeImage(id) {
    console.log(id)
    setMemeList(memeList.filter((meme) => meme.id != id))
  }

  const list = memeList.map((meme, index) => {
    return  <MemeEdits
      key={meme.id}
      topText={meme.topText}
      bottomText={meme.bottomText}
      randomImage={meme.randomImage}
      updateMemeItem={updateMemeItem}
      deleteMemeImage={deleteMemeImage}
      id={meme.id}
    />})

  

  return (
    <div className="App">
      <Header />
      <MemeMaker submit={addNewItem}/>
      <hr/><br></br>
      <h2 className="meme--list--title">Created Memes</h2>
      {list}
    </div>
  );
}

export default App;
