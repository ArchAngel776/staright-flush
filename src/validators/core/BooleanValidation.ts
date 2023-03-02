import { Validators } from "../../core/data/interfaces/Validators"
import { Keyof } from "../../core/data/types/Keyof"
import BaseModel from "../../core/foundations/BaseModel"
import Validation, { ValidationData } from "../../core/foundations/Validation"
import NeastedObjectHelper from "../../core/helpers/NeastedObjectHelper"
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

    public isValid(model: BaseModel<Schema>, attribute: Keyof<Schema>): boolean
    {
        const helper = new NeastedObjectHelper(<Schema> model.attributes)
        return typeof helper.get(attribute) === "boolean"
    }

    public getErrorMessage(): string
    {
        return "Property {attribute} must be a boolean"
    }
}