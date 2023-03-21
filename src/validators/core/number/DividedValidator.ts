import ValidatorSignature from "@decorators/signatures/ValidatorSignature"

import format from "@hooks/format"

import Validator from "@core/Validator"


@ValidatorSignature()
export default class DividedValidator<Schema> extends Validator<Schema, number, number>
{
    protected divider!: number

    public init(divider: number): void
    {
        this.divider = divider
    }

    public validate(divider: number): boolean
    {
        return this.getProperty() % divider === 0
    }

    public getErrorMessage(): string
    {
        return format("Property {attribute} must be divided by {divider}", {
            attribute: this.attributeName,
            divider: this.divider.toString()
        })
    }
}