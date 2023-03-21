import { Validators } from "@data/interfaces/Validators"
import { Keyof } from "@data/types/Keyof"

import BaseModel from "@foundations/BaseModel"
import Validation, { ValidationData } from "@foundations/Validation"
import NeastedObjectHelper from "@helpers/NeastedObjectHelper"

import merge from "@hooks/merge"

import NewerThenValidator from "@validators/core/date/NewerThenValidator"
import OlderThenValidator from "@validators/core/date/OlderThenValidator"


export interface DateValidationData<Schema> extends ValidationData<Schema>
{
    olderThen: Date
    newerThen: Date
}

export default class DateValidation<Schema> extends Validation<Schema, DateValidationData<Schema>>
{
    public validators(): Validators<Schema, DateValidationData<Schema>>
    {
        return merge(super.validators(), {
            olderThen: OlderThenValidator,
            newerThen: NewerThenValidator
        })
    }

    public isValid(model: BaseModel<Schema>, attribute: Keyof<Schema>): boolean
    {
        const helper = new NeastedObjectHelper(<Schema> model.attributes)
        return helper.get(attribute) instanceof Date
    }

    public getErrorMessage(): string
    {
        return "Property {attribute} must be a valid Date object"
    }
}