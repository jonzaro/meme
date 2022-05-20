import React from "react";
import axios from "axios";
import GeneratedMemes from "./GeneratedMemes";
import uuid from "react-uuid";

function Meme() {
  // const [memeImage, setMemeImage] = React.useState("")
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
    id: "",
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

  //   console.log(allMemes);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  const [memeGen, setMemeGen] = React.useState([]);

  function createMemeImage(e) {
    e.preventDefault();
    const memeList = memeGen;
    memeList.unshift(meme);
    const id = uuid();
    setMemeGen([...memeList], (meme.id = id));
    getMemeImage();
    console.log(memeList);
  }

  function updateMemeImage() {
    alert("Edit Button");
  }

  function deleteMemeImage(id) {
    setMemeGen(memeGen.filter((meme) => meme.id != id));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <main>
      <div className="form">
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
        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image🖼{" "}
        </button>{" "}
      </div>{" "}
      <div className="meme">
        <img src={meme.randomImage} className="meme--image" alt="" />
        <h2 className="meme--text top"> {meme.topText} </h2>{" "}
        <h2 className="meme--text bottom"> {meme.bottomText} </h2>{" "}
      </div>{" "}
      <button className="save--button" onClick={createMemeImage}>
        Save meme image🖼{" "}
      </button>{" "}
      {/* ////////////////////////////////////////////////////////////////// */}
      {memeGen.map((memeG, id) => {
        return (
          <div key={Math.random()} id={id}>
            <div className="saved-meme">
              <div className="meme-content">
                <img src={memeG.randomImage} className="meme--image" alt="" />
                <h2 className="meme--text top"> {memeG.topText} </h2>
                <h2 className="meme--text bottom"> {memeG.bottomText} </h2>
              </div>
              <div className="meme-buttons">
                <button className="edit-button" onClick={updateMemeImage}>
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => deleteMemeImage(memeG.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </main>
  );
}

export default Meme;
