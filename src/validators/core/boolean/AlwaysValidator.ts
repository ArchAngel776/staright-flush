import format from "@hooks/format"
import strBool from "@hooks/strBool"

import ValidatorSignature from "@decorators/signatures/ValidatorSignature"

import Validator from "@core/Validator"


@ValidatorSignature()
export default class AlwaysValidator<Schema> extends Validator<Schema, boolean, boolean>
{
    protected value!: boolean

    public init(value: boolean): void
    {
        this.value = value
    }

    public validate(value: boolean): boolean
    {
        return value === this.getProperty()
    }

    public getErrorMessage(): string
    {
        return format("Boolean property {attribute} must always be {value}", {
            attribute: this.attributeName,
            value: strBool(this.value)
        })
    }
}