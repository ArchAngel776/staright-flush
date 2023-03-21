import ValidatorSignature from "@decorators/signatures/ValidatorSignature"

import format from "@hooks/format"

import Validator from "@core/Validator"


@ValidatorSignature()
export default class MinValidator<Schema> extends Validator<Schema, number, number>
{
    protected min!: number

    public init(min: number): void
    {
        this.min = min
    }

    public validate(min: number): boolean
    {
        return min <= this.getProperty()
    }

    public getErrorMessage(): string
    {
        return format("Property {attribute} must be greater than or equal {min}", {
            attribute: this.attributeName,
            min: this.min.toString()
        })
    }
}