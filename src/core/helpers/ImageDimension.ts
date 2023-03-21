import getDimensions from "image-size"

import Dimensions from "@data/interfaces/Dimensions"


export default class ImageDimensions
{
    protected image: string

    public constructor(image: string)
    {
        this.image = image
    }

    public get dimensions(): Dimensions
    {
        return <Dimensions> getDimensions(this.image)
    }

    public get width(): number
    {
        return this.dimensions.width
    }

    public get height(): number
    {
        return this.dimensions.height
    }
}