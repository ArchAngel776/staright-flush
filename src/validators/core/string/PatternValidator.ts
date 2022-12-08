import { AsyncAwait } from "../../../core/data/types/AsyncAwait";
import format from "../../../core/hooks/format";
import Validator from "../../../core/Validator"

export default class PatternValidator<Schema> extends Validator<Schema, RegExp>
{
    public validate(value: RegExp): AsyncAwait<boolean>
    {
        return value.test(this.getProperty())
    }

    public getErrorMessage(): string
    {
        return format("Property {attribute} must match specified pattern", {
            attribute: this.attributeName
        })
    }
}