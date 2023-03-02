import Scenario from "../../../core/data/interfaces/Scenario"
import { ValidationSchema } from "../../../core/data/interfaces/ValidationSchema"
import { Keyof } from "../../../core/data/types/Keyof"
import format from "../../../core/hooks/format"
import Validator from "../../../core/Validator"

export default class SchemaValidator<Schema> extends Validator<Schema, ValidationSchema<Schema>>
{
    public async validate(value: ValidationSchema<Schema>): Promise<boolean>
    {
        for (const property in value) {
            const validation = value[property] as Scenario<Schema>

            try {
                await validation.make(this.model, `${this.attribute}.${property}` as Keyof<Schema>)
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