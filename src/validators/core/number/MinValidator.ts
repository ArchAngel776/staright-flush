import format from "../../../core/hooks/format"
import Validator from "../../../core/Validator"

export default class MinValidator<Schema> extends Validator<Schema, number>
{
    protected value = 0

    public validate(value: number): boolean
    {
        return (this.value = value) <= this.getProperty<number>()
    }

    public getErrorMessage(): string
    {
        return format("Property {attribute} must be greater than or equal {min}", {
            attribute: this.attributeName,
            min: this.value.toString()
        })
    }
}