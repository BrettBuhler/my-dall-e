import { useState } from "react"

import Input from "./Input"
import Size from "./Size"

import { getImage } from "../services/getImage"

interface MakeImageUIProps {
    imageArray: string[][]
    setImageArray: React.Dispatch<React.SetStateAction<string[][]>>
}

const MakeImageUI: React.FC<MakeImageUIProps> = ({ imageArray, setImageArray }) => {
    const [size, setSize] = useState<number>(256)
    const [inputValue, setInputValue] = useState<string>("")

    const makeNewImage = async () => {
        try {
            const response:any = await getImage(inputValue, 1, `${size}x${size}`)
            console.log(response)
            const tempImageArray = [...imageArray]
            tempImageArray.push([response.data.data[0].url, `${size}`])
            setImageArray(tempImageArray)
            setInputValue("")
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <Input value={inputValue} setValue={setInputValue}/>
            <Size size={size} setSize={setSize} />
            <button onClick={makeNewImage}>Make Image</button>
        </div>
    )
}

export default MakeImageUI