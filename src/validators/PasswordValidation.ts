import { ErrorMessage } from "../core/data/interfaces/ErrorMessage"
import { ValidationData } from "../core/foundations/Validation"
import merge from "../core/hooks/merge"
import StringValidation, { StringValidationData } from "./core/StringValidation"

export default class PasswordValidation<Schema> extends StringValidation<Schema>
{
    public constructor(data: Partial<ValidationData> = {})
    {
        super()
        this.data = merge(this.passwordOptions(), data)
    }

    public passwordOptions(): Partial<StringValidationData>
    {
        return {
            required: true,
            unique: false,
            min: 8,
            max: 32,
            pattern: /^([a-zA-Z0-9\_\-\!\@\#\$\%\^\&\*\(\)\,\.]+)$/
        }
    }

    public errorMessages(): ErrorMessage<StringValidationData>
    {
        return {
            min: "Password must contain between 8 and 32 signs",
            max: "Password must contain between 8 and 32 signs",
            pattern: "Password can only contain upper and lower letters, digits and special signs"
        }
    }
}