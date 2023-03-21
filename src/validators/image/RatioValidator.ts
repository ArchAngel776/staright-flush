import { FileArray } from "express-fileupload"

import { Ratio } from "@data/types/Ratio"

import FileValidator from "@foundations/FileValidator"
import ImageDimensions from "@helpers/ImageDimension"
import ValidatorSignature from "@decorators/signatures/ValidatorSignature"

import format from "@hooks/format"
import ratioValue from "@hooks/ratioValue"


@ValidatorSignature<FileArray, Ratio>()
export default class RatioValidator extends FileValidator<Ratio>
{
    protected ratio!: Ratio

    public init(ratio: Ratio): void
    {
        this.ratio = ratio
    }

    public validate(ratio: Ratio): boolean
    {
        const value = ratioValue(ratio)

        for (const { tempFilePath } of this.getFiles) {
            const { width, height } = new ImageDimensions(tempFilePath)

            if (width / height !== value) {
                return false
            }
        }

        return true
    }

    public getErrorMessage(): string 
    {
        return format("All images from field {attribute} must have dimensions which matching ratio: {ratio}", {
            attribute: this.attributeName,
            ratio: this.ratio
        })
    }
}