import format from "../../../core/hooks/format"
import Validator from "../../../core/Validator"

export default class MaxValidator<Schema> extends Validator<Schema, number>
{
    protected value = 0

    public validate(value: number): boolean
    {
        return (this.value = value) >= this.getProperty<number>()
    }

    public getErrorMessage(): string
    {
        return format("Property {attribute} must be less than or equal {max}", {
            attribute: this.attributeName,
            max: this.value.toString()
        })
    }
}