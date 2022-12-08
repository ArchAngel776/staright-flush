import { Validators } from "../../core/data/interfaces/Validators"
import BaseModel from "../../core/foundations/BaseModel"
import Validation, { ValidationData } from "../../core/foundations/Validation"
import merge from "../../core/hooks/merge"
import AlwaysValidator from "./boolean/AlwaysValidator"

export interface BooleanValidationData extends ValidationData
{
    always: boolean
}

export default class BooleanValidation<Schema> extends Validation<Schema, BooleanValidationData>
{
    public validators(): Validators<Schema, BooleanValidationData>
    {
        return merge(super.validators(), {
            always: AlwaysValidator
        })
    }

    public isValid(model: BaseModel<Schema>, attribute: keyof Schema): boolean
    {
        return typeof model.attributes[attribute] === "boolean"
    }

    public getErrorMessage(): string
    {
        return "Property {attribute} must be a boolean"
    }
}