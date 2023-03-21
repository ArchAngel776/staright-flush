import { FileArray } from "express-fileupload"

import { Validators } from "@data/interfaces/Validators"
import { Multi } from "@data/types/Multi"
import { MimeType } from "@data/enums/MimeType"

import Validation, { ValidationData } from "@foundations/Validation"
import BaseModel from "@foundations/BaseModel"

import merge from "@hooks/merge"

import TypeValidator from "@validators/core/file/TypeValidator"
import MultipleFilesValidators from "@validators/core/file/MultipleFilesValidator"


export interface FileValidationData extends ValidationData<FileArray>
{
    multipleFiles: boolean 
    type: Multi<MimeType>
}

export default class FileValidation extends Validation<FileArray, FileValidationData>
{
    public validators(): Validators<FileArray, FileValidationData>
    {
        return merge(super.validators(), {
            type: TypeValidator,
            multipleFiles: MultipleFilesValidators
        })
    }

    public isValid(model: BaseModel<FileArray>, attribute: string): boolean
    {
        return typeof model.attributes[attribute] === "object"
    }

    public getErrorMessages(): string
    {
        return "File {attribute} incorrectly implemented in current request"
    }
}