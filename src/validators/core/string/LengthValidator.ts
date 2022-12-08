import format from "../../../core/hooks/format"
import Validator from "../../../core/Validator"

export default class LengthValidator<Schema> extends Validator<Schema, number>
{
    protected value = 0

    public validate(value: number): boolean
    {
        const { length } = this.getProperty<string>()
        return length === (this.value = value)
    }

    public getErrorMessage(): string
    {
        return format("Attribute {attribute} must have exactly {length} length", {
            attribute: this.attributeName,
            length: this.value.toString()
        })
    }
}