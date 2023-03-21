import { Constructor } from "@data/types/Constructor"

import format from "@hooks/format"

import ValidatorSignature from "@decorators/signatures/ValidatorSignature"

import Validator from "@core/Validator"


@ValidatorSignature()
export default class TypeofValidator<Schema> extends Validator<Schema, Constructor>
{
    protected name!: string

    public init(Target: Constructor): void
    {
        this.name = Target.name
    }

    public validate(Target: Constructor): boolean
    {
        return this.getProperty() instanceof Target
    }

    public getErrorMessage(): string
    {
        return format("Property {attribute} must be instance of {object}", {
            attribute: this.attributeName,
            object: this.name
        })
    }
}