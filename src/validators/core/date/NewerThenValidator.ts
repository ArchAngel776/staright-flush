import DateHelper from "../../../core/helpers/DateHelper"
import format from "../../../core/hooks/format"
import timestamp from "../../../core/hooks/timestamp"
import Validator from "../../../core/Validator"

export default class NewerThenValidator<Schema> extends Validator<Schema, Date>
{
    protected value = new Date

    public validate(value: Date): boolean
    {
        return timestamp(this.getProperty<Date>()) > timestamp(this.value = value)
    }

    public getErrorMessage(): string
    {
        return format("Date property {attribute} must be newer than {date}", {
            attribute: this.attributeName,
            date: DateHelper.format("d-m-Y H:i:s", this.value)
        })
    }
}