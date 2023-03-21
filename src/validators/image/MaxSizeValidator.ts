import { FileArray } from "express-fileupload"

import Dimensions from "@data/interfaces/Dimensions"

import FileValidator from "@foundations/FileValidator"
import ImageDimensions from "@helpers/ImageDimension"
import ValidatorSignature from "@decorators/signatures/ValidatorSignature"

import format from "@hooks/format"


@ValidatorSignature<FileArray, Partial<Dimensions>>()
export default class MaxSizeValidator extends FileValidator<Partial<Dimensions>>
{
    protected width: number | undefined

    protected height: number | undefined

    public init({ width, height }: Partial<Dimensions>): void
    {
        this.width = width
        this.height = height
    }

    public validate({ width, height }: Partial<Dimensions>): boolean
    {
        for (const { tempFilePath } of this.getFiles) {
            const helper = new ImageDimensions(tempFilePath)
            if (width && helper.width > width) {
                return false
            }
            if (height && helper.height > height) {
                return false
            }
        }
        return true
    }

    public getErrorMessage(): string
    {
        return format("All images from field {attribute} cannot be larger than {sizes}", {
            attribute: this.attributeName,
            sizes: this.sizesInfo
        })
    }

    protected get sizesInfo(): string
    {
        const sizes = []
        if (this.width) {
            sizes.push(`${this.width}px on width`)
        }
        if (this.height) {
            sizes.push(`${this.height}px on height`)
        }
        return sizes.join(" and ")
    }
}