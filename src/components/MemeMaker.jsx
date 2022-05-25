import React, {useState} from 'react';
import axios from "axios";


function Meme(props) {
  // const [memeImage, setMemeImage] = React.useState("")
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg", 
    
  });

  const [allMemes, setAllMemes] = React.useState([]);

  React.useEffect(function () {
    console.log("Effect Ran");
    axios
      .get("https://api.imgflip.com/get_memes")
      .then((response) => {
        setAllMemes(response.data.data.memes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }
  
  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  const createMemeImage = (e) => { 
    e.preventDefault()
    props.submit(meme)
    setMeme({ 
        topText: "",
        bottomText: ""
        
    })
    getMemeImage()
}

  return (
    <main>
      <button className="form--button" onClick={getMemeImage}>
          Get a new meme image🖼{" "}
        </button>
        <br/>
      <form onSubmit={createMemeImage} className="form">
        <input
          name="topText"
          type="text"
          className="form--input"
          placeholder="Top Text"
          value={meme.topText}
          onChange={handleChange}
        />{" "}
        <input
          name="bottomText"
          type="text"
          className="form--input"
          placeholder="Bottom Text"
          value={meme.bottomText}
          onChange={handleChange}
        />{" "}
        <button className="save--button" >
        Save meme image🖼{" "}
        </button>{" "}
      </form>
      
        <div className="meme">
            <img src={meme.randomImage} className="meme--image" alt="" />
            <h2 className="meme--text top"> {meme.topText} </h2>{" "}
            <h2 className="meme--text bottom"> {meme.bottomText} </h2>{" "}
          </div>{" "}
    </main>
  );
}

export default Meme;
