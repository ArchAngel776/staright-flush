import defined from "../../hooks/defined"
import format from "../../hooks/format"
import Validator from "../../Validator"

export default class RequiredValidator<Schema> extends Validator<Schema, boolean>
{
    public validate(value: boolean): boolean
    {
        return value ? defined(this.getProperty()) : true
    }

    public getErrorMessage(): string
    {
        return format("Property {attribute} is required.", {
            attribute: this.attributeName
        })
    }
}