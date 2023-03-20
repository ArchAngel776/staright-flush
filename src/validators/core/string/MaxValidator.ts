import format from "@hooks/format"

import ValidatorSignature from "@decorators/signatures/ValidatorSignature"

import Validator from "@core/Validator"


@ValidatorSignature()
export default class MaxValidator<Schema> extends Validator<Schema, number, string>
{
    protected max!: number

    public init(max: number): void
    {
        this.max = max
    }

    public validate(max: number): boolean
    {
        const { length } = this.getProperty()
        return length <= max
    }

    public getErrorMessage(): string
    {
        return format("Length of property {attribute} cannot be greater then {max}", {
            attribute: this.attributeName,
            max: this.max.toString()
        })
    }
}