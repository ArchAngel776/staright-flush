import { FileArray } from "express-fileupload"

import { Validators } from "@core/data/interfaces/Validators"
import { ImageOrientation } from "@data/types/ImageOrientation"
import { Ratio } from "@data/types/Ratio"
import { MimeType } from "@data/enums/MimeType"
import { Multi } from "@data/types/Multi"
import Dimensions from "@data/interfaces/Dimensions"

import merge from "@core/hooks/merge"

import FileValidation, { FileValidationData } from "@validators/core/FileValidation"
import OrientationValidator from "@validators/image/OrientationValidator"
import RatioValidator from "@validators/image/RatioValidator"
import MaxSizeValidator from "@validators/image/MaxSizeValidator"


export interface ImageValidationData extends FileValidationData
{
    type: Multi<MimeType.PNG | MimeType.JPG | MimeType.GIF | MimeType.WEBP | MimeType.ICO>
    orientation: ImageOrientation
    ratio: Ratio
    maxSize: Partial<Dimensions>
}

export default class ImageValidation extends FileValidation
{
    public constructor(data: Partial<ImageValidationData> = {})
    {
        super(data)
    }

    public validators(): Validators<FileArray, ImageValidationData>
    {
        return merge(super.validators(), {
            orientation: OrientationValidator,
            ratio: RatioValidator,
            maxSize: MaxSizeValidator
        })
    }
}