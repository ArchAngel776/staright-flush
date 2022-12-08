import format from "../../../core/hooks/format"
import Validator from "../../../core/Validator"

export default class MinValidator<Schema> extends Validator<Schema, number>
{
    protected value = 0

    public validate(value: number): boolean
    {
        const { length } = this.getProperty<string>()
        return length >= (this.value = value)
    }

    public getErrorMessage(): string
    {
        return format("Length of property {attribute} cannot be less then {min}", {
            attribute: this.attributeName,
            min: this.value.toString()
        })
    }
}