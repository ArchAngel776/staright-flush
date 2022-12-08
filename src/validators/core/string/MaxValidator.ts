import format from "../../../core/hooks/format"
import Validator from "../../../core/Validator"

export default class MaxValidator<Schema> extends Validator<Schema, number>
{
    protected value = 0

    public validate(value: number): boolean
    {
        const { length } = this.getProperty<string>()
        return length <= (this.value = value)
    }

    public getErrorMessage(): string
    {
        return format("Length of property {attribute} cannot be greater then {min}", {
            attribute: this.attributeName,
            min: this.value.toString()
        })
    }
}