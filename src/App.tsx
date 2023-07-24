import { useState, ChangeEvent } from "react"

import Gallery from "./components/Gallery"
import MakeImageUI from "./components/MakeImageUI"
import ImageMask from "./components/ImageMask"

import { getImage } from "./services/getImage"
import aiCath from "./images/AiCath.png"

const App = () => {
    const [inputValue, setInputValue] = useState<string>("")
    const [size, setSize] = useState<number>(0)
    const [imageArray, setImageArray] = useState<string[][]>([])

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
        <MakeImageUI imageArray={imageArray} setImageArray={setImageArray} />
        {imageArray.length > 0 && (
          <Gallery imageArray={imageArray} />
        )}
        <ImageMask imageUrl={aiCath} maskColor="white"/>
    </div>)
}

export default App