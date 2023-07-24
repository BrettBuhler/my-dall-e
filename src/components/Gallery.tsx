import React from "react"

interface GalleryProps {
    imageArray: string[][]
}

const Gallery: React.FC<GalleryProps> = ({ imageArray }) => {
    return (
        <div>
            {imageArray.map((image, i) => (
                <div key={`image_${i}`} style={{height: `${imageArray[1]}px`, width: `${imageArray[1]}px`}}>
                    <img src={image[0]}></img>
                </div>
            ))}
        </div>
    )
}

export default Gallery