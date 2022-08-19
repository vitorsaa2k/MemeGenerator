import React from "react";



export default function Input() {
    //let [memeImage, setMemeImage] = React.useState('http://i.imgflip.com/1bij.jpg')

    const [meme, setMeme] = React.useState({
        topText: '',
        bottomText: '',
        randomImage: 'http://i.imgflip.com/1bij.jpg',
    })

    const [allMemes, setAllMemes] = React.useState([])

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    })

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: allMemes[randomNumber].url
        }))
    }

    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    return (
        <main>
            <div className="inter--box">
                <div className="input--box">
                    <input 
                    className="input"
                    type="text"
                    placeholder="Top text"
                    value={meme.topText}
                    onChange={handleChange}
                    name="topText"
                     />
                    <input
                    className="input"
                    type="text"
                    placeholder="Bottom text"
                    value={meme.bottomText}
                    onChange={handleChange}
                    name="bottomText"
                    />
                </div>
                <button onClick={getMemeImage} className="get--meme">Get a new meme image</button>
            </div>
            <div className="meme">
                <img className="meme--image" alt="" src={meme.randomImage} />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main> 
    )
}