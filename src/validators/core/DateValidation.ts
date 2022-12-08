import { Validators } from "../../core/data/interfaces/Validators"
import BaseModel from "../../core/foundations/BaseModel"
import Validation, { ValidationData } from "../../core/foundations/Validation"
import merge from "../../core/hooks/merge"
import NewerThenValidator from "./date/NewerThenValidator"
import OlderThenValidator from "./date/OlderThenValidator"

export interface DateValidationData extends ValidationData
{
    olderThen: Date
    newerThen: Date
}

export default class DateValidation<Schema> extends Validation<Schema, DateValidationData>
{
    public validators(): Validators<Schema, DateValidationData>
    {
        return merge(super.validators(), {
            olderThen: OlderThenValidator,
            newerThen: NewerThenValidator
        })
    }

    public isValid(model: BaseModel<Schema>, attribute: keyof Schema): boolean
    {
        return model.attributes[attribute] instanceof Date
    }

    public getErrorMessage(): string
    {
        return "Property {attribute} must be a valid Date object"
    }
}