import DateHelper from "@helpers/DateHelper"
import ValidatorSignature from "@decorators/signatures/ValidatorSignature"

import format from "@hooks/format"
import timestamp from "@hooks/timestamp"

import Validator from "@core/Validator"


@ValidatorSignature()
export default class OlderThenValidator<Schema> extends Validator<Schema, Date, Date>
{
    protected date!: Date

    public init(date: Date): void
    {
        this.date = date
    }

    public validate(date: Date): boolean
    {
        return timestamp(this.getProperty()) < timestamp(date)
    }

    public getErrorMessage(): string
    {
        return format("Date property {attribute} must be older than {date}", {
            attribute: this.attributeName,
            date: DateHelper.format("d-m-Y H:i:s", this.date)
        })
    }
}