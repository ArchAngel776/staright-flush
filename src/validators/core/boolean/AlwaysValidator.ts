import { AsyncAwait } from "../../../core/data/types/AsyncAwait"
import format from "../../../core/hooks/format"
import strBool from "../../../core/hooks/strBool"
import Validator from "../../../core/Validator"

export default class AlwaysValidator<Schema> extends Validator<Schema, boolean>
{
    protected value = false

    public validate(value: boolean): AsyncAwait<boolean>
    {
        return this.getProperty<boolean>() === (this.value = value)
    }

    public getErrorMessage(): string
    {
        return format("Boolean property {attribute} must always be {value}", {
            attribute: this.attributeName,
            value: strBool(this.value)
        })
    }
}