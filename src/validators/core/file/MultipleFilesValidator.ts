import { FileArray } from "express-fileupload"

import FileValidator from "@foundations/FileValidator"
import ValidatorSignature from "@decorators/signatures/ValidatorSignature"

import format from "@hooks/format"


@ValidatorSignature<FileArray, boolean>()
export default class MultipleFilesValidators extends FileValidator<boolean>
{
    protected multi!: boolean

    public init(multi: boolean): void
    {
        this.multi = multi
    }

    public validate(multi: boolean): boolean
    {
        const isMultiple = this.getProperty() instanceof Array
        return multi ? isMultiple : !isMultiple
    }

    public getErrorMessage(): string
    {
        return format("File {attribute} must be {expression}", {
            attribute: this.attributeName,
            expression: this.multi ? this.multipleFileExpression : this.singleFileExpression
        })
    }

    protected get singleFileExpression(): string
    {
        return "a single file instance"
    }

    protected get multipleFileExpression(): string
    {
        return "multiple file's array"
    }
}