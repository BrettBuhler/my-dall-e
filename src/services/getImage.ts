import { promises } from "fs"
import { Configuration, OpenAIApi } from "openai"

export const getImage = async (image_text: string, n: number, size: string) => {
    const config = new Configuration({
        apiKey: process.env.REACT_APP_OPEN_AI_KEY
    })
    const openai = new OpenAIApi(config)
    try {
        const setSides = size === "256x256" ? size : size === "512x512" ? size : "1024x1024"
        const response = await openai.createImage({
            prompt: image_text,
            n: n,
            size: setSides
        })
        return response
    } catch (error) {
        console.error(error)
        return {error}
    }
}