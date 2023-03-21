import { FileArray } from "express-fileupload"

import { MimeType } from "@data/enums/MimeType"
import { Multi } from "@data/types/Multi"

import FileValidator from "@foundations/FileValidator"
import ValidatorSignature from "@decorators/signatures/ValidatorSignature"

import multi from "@hooks/multi"
import format from "@hooks/format"


@ValidatorSignature<FileArray, Multi<MimeType>>()
export default class TypeValidator extends FileValidator<Multi<MimeType>>
{
    protected types!: Array<MimeType>

    public init(types: Multi<MimeType>): void
    {
        this.types = multi(types)
    }

    public validate(): boolean
    {
        for (const { mimetype } of this.getFiles) {
            if (!this.types.includes(<MimeType> mimetype)) {
                return false
            }
        }
        return true
    }

    public getErrorMessage(): string
    {
        return format("File(s) {attribute} must be one of the followed types: {types}", {
            attribute: this.attributeName,
            types: this.types.join(", ")
        })
    }
}