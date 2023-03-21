import { ErrorMessage } from "@data/interfaces/ErrorMessage"

import { ValidationData } from "@foundations/Validation"
import { EmailExpression } from "@components/expressions/EmailExpression"

import merge from "@hooks/merge"

import StringValidation, { StringValidationData } from "@validators/core/StringValidation"


export default class EmailValidation<Schema> extends StringValidation<Schema>
{
    public constructor(data: Partial<ValidationData<Schema>> = {})
    {
        super()
        this.data = merge(this.emailOptions(), data)
    }

    public emailOptions(): Partial<StringValidationData<Schema>>
    {
        return {
            required: true,
            min: 4,
            max: 255,
            pattern: EmailExpression
        }
    }

    public errorMessages(): ErrorMessage<StringValidationData<Schema>>
    {
        return merge(super.errorMessages(), {
            required:   "Email is required",
            pattern:    "Property {attribute} must be correct email format"
        })
    }
}