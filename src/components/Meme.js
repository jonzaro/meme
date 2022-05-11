import React from "react"
import axios from "axios"

function Meme(){
// const [memeImage, setMemeImage] = React.useState("")
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })

    const [allMemes, setAllMemes] = React.useState([])


    React.useEffect(function() {
        console.log("Effect Ran")
        axios.get("https://api.imgflip.com/get_memes")
        .then((response) => {
            setAllMemes(response.data.data.memes)
               })
        .catch((error) => {
            console.log(error)
        })
    }, [])

    console.log(allMemes)


    function getMemeImage(){
        const randomNumber = Math.floor(Math.random() * allMemes.length) 
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }
    function handleChange(event){
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
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
                />
                    <input
                    name="bottomText"
                    type="text"
                    className="form--input"
                    placeholder="Bottom Text"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image  🖼</button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}

export default Meme