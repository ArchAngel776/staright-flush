import { String } from "../../../core/data/enums/String"
import { Constructor } from "../../../core/data/types/Constructor"
import format from "../../../core/hooks/format"
import Validator from "../../../core/Validator"

export default class TypeofValidator<Schema> extends Validator<Schema, Constructor>
{
    protected name: string = String.EMPTY

    public validate(value: Constructor): boolean
    {
        this.name = value.name
        return this.getProperty() instanceof value
    }

    public getErrorMessage(): string
    {
        return format("Property {attribute} must be instance of {object}", {
            attribute: this.attributeName,
            object: this.name
        })
    }
}