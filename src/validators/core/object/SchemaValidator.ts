import { ValidationSchema } from "@data/interfaces/ValidationSchema"
import { Keyof } from "@data/types/Keyof"

import ValidatorSignature from "@decorators/signatures/ValidatorSignature"

import format from "@hooks/format"

import Validator from "@core/Validator"


@ValidatorSignature()
export default class SchemaValidator<Schema> extends Validator<Schema, ValidationSchema<Schema>>
{
    public async validate(schema: ValidationSchema<Schema>): Promise<boolean>
    {
        for (const property in schema) {
            try {
                await schema[property].make(this.model, `${this.attribute}.${property}` as Keyof<Schema>)
            }
            catch {
                return false
            }
        }
        return true
    }

    public getErrorMessage(): string
    {
        return format("Property {attribute} doesn't match specified schema:\n{schema}", {
            attribute: this.attributeName
        })
    }
}