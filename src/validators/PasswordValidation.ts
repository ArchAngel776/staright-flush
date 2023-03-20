import { ErrorMessage } from "@data/interfaces/ErrorMessage"

import merge from "@hooks/merge"

import StringValidation, { StringValidationData } from "@validators/core/StringValidation"


export default class PasswordValidation<Schema> extends StringValidation<Schema>
{
    public constructor(data: Partial<StringValidationData<Schema>> = {})
    {
        super()
        this.data = merge(this.passwordOptions(), data)
    }

    public passwordOptions(): Partial<StringValidationData<Schema>>
    {
        return {
            required: true,
            min: 8,
            max: 32,
            pattern: /^([a-zA-Z0-9\_\-\!\@\#\$\%\^\&\*\(\)\,\.]+)$/
        }
    }

    public errorMessages(): ErrorMessage<StringValidationData<Schema>>
    {
        return merge(super.errorMessages(), {
            required:   "Password is required",
            min:        "Password must contain between 8 and 32 signs",
            max:        "Password must contain between 8 and 32 signs",
            pattern:    "Password can only contain upper and lower letters, digits and special signs"
        })
    }
}