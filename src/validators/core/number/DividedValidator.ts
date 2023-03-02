import format from "../../../core/hooks/format"
import Validator from "../../../core/Validator"

export default class DividedValidator<Schema> extends Validator<Schema, number>
{
    protected value = 0

    public validate(value: number): boolean
    {
        return this.getProperty<number>() % (this.value = value) === 0
    }

    public getErrorMessage(): string
    {
        return format("Property {attribute} must be divided by {divider}", {
            attribute: this.attributeName,
            divider: this.value.toString()
        })
    }
}