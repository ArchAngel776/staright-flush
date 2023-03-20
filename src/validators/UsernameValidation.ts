import { ErrorMessage } from "@data/interfaces/ErrorMessage"

import merge from "@hooks/merge"

import StringValidation, { StringValidationData } from "@validators/core/StringValidation"


export default class UsernameValidation<Schema> extends StringValidation<Schema>
{
    public constructor(data: Partial<StringValidationData<Schema>> = {})
    {
        super()
        this.data = merge(this.usernameOptions(), data)
    }

    public usernameOptions(): Partial<StringValidationData<Schema>>
    {
        return {
            required: true,
            min: 6,
            max: 24,
            pattern: /^([A-Za-z]+([\.\_\-]?[A-Za-z0-9]+)*)$/
        }
    }

    public errorMessages(): ErrorMessage<StringValidationData<Schema>>
    {
        return merge(super.errorMessages(), {
            required:   "Username is required",
            min:        "Username must contain between 6 and 24 signs",
            max:        "Username must contain between 6 and 24 signs",
            pattern:    "Username name can only contain upper and lower letters, digits and signs . - _"
        })
    }
}