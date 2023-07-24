interface SizeProps {
    size: number
    setSize: React.Dispatch<React.SetStateAction<number>>
}

const Size: React.FC<SizeProps> = ({ size, setSize }) => {

    const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedSize = parseInt(event.target.value, 10)
        setSize(selectedSize)
    }

    return (
        <div>
            <select value={size} onChange={handleSizeChange}>
                <option value={256}>256x256</option>
                <option value={512}>512x512</option>
                <option value={1024}>1024x1024</option>
            </select>
        </div>
    )
}

export default Size