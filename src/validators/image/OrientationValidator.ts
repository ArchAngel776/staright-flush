import { FileArray } from "express-fileupload"

import { ImageOrientation } from "@data/types/ImageOrientation"

import FileValidator from "@foundations/FileValidator"
import ImageDimensions from "@helpers/ImageDimension"
import ValidatorSignature from "@decorators/signatures/ValidatorSignature"

import format from "@hooks/format"


@ValidatorSignature<FileArray, ImageOrientation>()
export default class OrientationValidator extends FileValidator<ImageOrientation>
{
    protected orientation!: ImageOrientation

    public init(orientation: ImageOrientation): void
    {
        this.orientation = orientation
    }

    public validate(orientation: ImageOrientation): boolean
    {
        switch (orientation) {
            case "landscape":
                return this.checkLandscape()
            case "portrait":
                return this.checkPortrait()
            default:
                return true
        }
    }

    protected checkLandscape(): boolean
    {
        for (const { tempFilePath } of this.getFiles) {
            const { width, height } = new ImageDimensions(tempFilePath)

            if (width <= height) {
                return false
            }
        }

        return true
    }

    protected checkPortrait(): boolean
    {
        for (const { tempFilePath } of this.getFiles) {
            const { width, height } = new ImageDimensions(tempFilePath)

            if (width >= height) {
                return false
            }
        }

        return true
    }

    public getErrorMessage(): string
    {
        return format("All images from field {attribute} must have orientation {orientation}", {
            attribute: this.attributeName,
            orientation: this.orientation
        })
    }
}