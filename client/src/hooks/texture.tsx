import { Texture, TextureLoader } from "three"


export default function texture(url: string): Texture
{
    const texture = new TextureLoader().load(url)
    texture.flipY = false
    return texture
}