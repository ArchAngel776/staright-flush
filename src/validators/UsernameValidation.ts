import { ErrorMessage } from "../core/data/interfaces/ErrorMessage"
import { ValidationData } from "../core/foundations/Validation"
import merge from "../core/hooks/merge"
import StringValidation, { StringValidationData } from "./core/StringValidation"

export default class UsernameValidation<Schema> extends StringValidation<Schema>
{
    public constructor(data: Partial<ValidationData> = {})
    {
        super()
        this.data = merge(this.usernameOptions(), data)
    }

    public usernameOptions(): Partial<StringValidationData>
    {
        return {
            required: true,
            unique: true,
            min: 6,
            max: 24,
            pattern: /^([A-Za-z]+([\.\_\-]?[A-Za-z0-9]+)*)$/
        }
    }

    public errorMessages(): ErrorMessage<StringValidationData>
    {
        return merge(super.errorMessages(), {
            pattern: "Username name can only contain upper and lower letters, digits and signs . - _"
        })
    }
}