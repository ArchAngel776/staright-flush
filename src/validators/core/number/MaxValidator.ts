import ValidatorSignature from "@decorators/signatures/ValidatorSignature"

import format from "@hooks/format"

import Validator from "@core/Validator"


@ValidatorSignature()
export default class MaxValidator<Schema> extends Validator<Schema, number, number>
{
    protected max!: number

    public init(max: number): void
    {
        this.max = max
    }

    public validate(max: number): boolean
    {
        return max >= this.getProperty()
    }

    public getErrorMessage(): string
    {
        return format("Property {attribute} must be less than or equal {max}", {
            attribute: this.attributeName,
            max: this.max.toString()
        })
    }
}