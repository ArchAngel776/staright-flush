import format from "@hooks/format"

import ValidatorSignature from "@decorators/signatures/ValidatorSignature"

import Validator from "@core/Validator"


@ValidatorSignature()
export default class MinValidator<Schema> extends Validator<Schema, number, string>
{
    protected min!: number

    public init(min: number): void
    {
        this.min = min
    }

    public validate(min: number): boolean
    {
        const { length } = this.getProperty()
        return length >= min
    }

    public getErrorMessage(): string
    {
        return format("Length of property {attribute} cannot be less then {min}", {
            attribute: this.attributeName,
            min: this.min.toString()
        })
    }
}