import React from 'react'
import { ChangeEvent } from 'react'

interface InputProps {
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>
}

const Input: React.FC<InputProps> = ({ value, setValue }) => {

    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>):void => {
        setValue(event.target.value)
    }

    return(
        <div>
            <textarea value={value} onChange={handleInputChange} placeholder='Enter image description:'/>
        </div>
    )
}
export default Input