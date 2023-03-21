import format from "@hooks/format"

import ValidatorSignature from "@decorators/signatures/ValidatorSignature"

import Validator from "@core/Validator"


@ValidatorSignature()
export default class PatternValidator<Schema> extends Validator<Schema, RegExp, string>
{
    protected pattern!: RegExp

    public init(pattern: RegExp): void
    {
        this.pattern = pattern
    }

    public validate(pattern: RegExp): boolean
    {
        return pattern.test(this.getProperty())
    }

    public getErrorMessage(): string
    {
        return format("Property {attribute} must match specified pattern {pattern}", {
            attribute: this.attributeName,
            pattern: this.pattern.toString()
        })
    }
}