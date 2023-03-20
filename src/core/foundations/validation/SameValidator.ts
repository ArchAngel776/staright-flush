import { String } from "@data/enums/String"
import { AsyncAwait } from "@data/types/AsyncAwait"
import { Keyof } from "@data/types/Keyof"

import NeastedObjectHelper from "@helpers/NeastedObjectHelper"

import format from "@hooks/format"

import Validator from "@core/Validator"


export default class SameValidator<Schema> extends Validator<Schema, Keyof<Schema>>
{
    protected value: string = String.EMPTY

    public validate(value: Keyof<Schema>): AsyncAwait<boolean>
    {
        const helper = new NeastedObjectHelper(<Schema> this.target.attributes)
        return helper.get(this.value = value) === this.getProperty()
    }

    public getErrorMessage(): string
    {
        return format("Property {attribute} must be the same like property {value}", {
            attribute: this.attributeName,
            value: this.value
        })
    }
}