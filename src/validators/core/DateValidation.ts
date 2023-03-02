import { Validators } from "../../core/data/interfaces/Validators"
import { Keyof } from "../../core/data/types/Keyof"
import BaseModel from "../../core/foundations/BaseModel"
import Validation, { ValidationData } from "../../core/foundations/Validation"
import NeastedObjectHelper from "../../core/helpers/NeastedObjectHelper"
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