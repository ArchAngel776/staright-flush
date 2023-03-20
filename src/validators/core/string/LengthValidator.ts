import format from "@hooks/format"

import ValidatorSignature from "@decorators/signatures/ValidatorSignature"

import Validator from "@core/Validator"


@ValidatorSignature()
export default class LengthValidator<Schema> extends Validator<Schema, number, string>
{
    protected length!: number

    public init(length: number): void
    {
        this.length = length
    }

    public validate(value: number): boolean
    {
        const { length } = this.getProperty()
        return length === value
    }

    public getErrorMessage(): string
    {
        return format("Attribute {attribute} must have exactly {length} length", {
            attribute: this.attributeName,
            length: this.length.toString()
        })
    }
}