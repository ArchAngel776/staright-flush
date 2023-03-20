import { ErrorMessage } from "@data/interfaces/ErrorMessage"

import merge from "@hooks/merge"

import StringValidation, { StringValidationData } from "@validators/core/StringValidation"


export default class ConsentsTermsValidation<Schema> extends StringValidation<Schema>
{
    public constructor(data: Partial<StringValidationData<Schema>> = {})
    {
        super()
        this.data = merge(this.consentsTermsOptions(), data)
    }

    public consentsTermsOptions(): Partial<StringValidationData<Schema>>
    {
        return {
            required: true,
            pattern: /^(on|off)$/i
        }
    }

    public errorMessages(): ErrorMessage<StringValidationData<Schema>>
    {
        return {
            required:   "Consents terms are required to know by administration",
            pattern:    "Consents terms must be accepted or canceled"
        }
    }
}