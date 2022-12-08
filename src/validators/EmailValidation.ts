import { ErrorMessage } from "../core/data/interfaces/ErrorMessage"
import { ValidationData } from "../core/foundations/Validation"
import merge from "../core/hooks/merge"
import StringValidation, { StringValidationData } from "./core/StringValidation"

export default class EmailValidation<Schema> extends StringValidation<Schema>
{
    public constructor(data: Partial<ValidationData> = {})
    {
        super()
        this.data = merge(this.emailOptions(), data)
    }

    public emailOptions(): Partial<StringValidationData>
    {
        return {
            required: true,
            unique: false,
            min: 4,
            max: 255,
            pattern: /^(?:[a-z0-9\!\#\$\%\&\'\*\+\/\=\?\^\_\{\|\}\~\-]+(?:\.[a-z0-9\!\#\$\%\&\'\*\+\/\=\?\^\_\{\|\}\~\-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")\@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i
        }
    }

    public errorMessages(): ErrorMessage<StringValidationData>
    {
        return merge(super.errorMessages(), {
            pattern: "Property {attribute} must be correct email format"
        })
    }
}