import { useState, ChangeEvent } from "react"

import Gallery from "./components/Gallery"

import { getImage } from "./services/getImage"

const App = () => {
    const [inputValue, setInputValue] = useState<string>("")
    const [imageArray, setImageArray] = useState<string[][]>([])

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>):void => {
        setInputValue(event.target.value)
    }

    const makeNewImage = async () => {
        try {
            const response:any = await getImage(inputValue, 1, '256x256')
            console.log(response)
            const tempImageArray = [...imageArray]
            tempImageArray.push([response.data.data[0].url, '256'])
            setImageArray(tempImageArray)
            setInputValue("")
        } catch (error) {
            console.error(error)
        }
    }

    return (<div>
        <input value={inputValue} onChange={handleInputChange}></input>
        <button onClick={makeNewImage}>Make IMG</button>
        {imageArray.length > 0 && (
          <Gallery imageArray={imageArray} />
        )}
    </div>)
}

export default App