import { Validators } from "../../core/data/interfaces/Validators"
import { Constructor } from "../../core/data/types/Constructor"
import BaseModel from "../../core/foundations/BaseModel"
import Validation, { ValidationData } from "../../core/foundations/Validation"
import merge from "../../core/hooks/merge"
import TypeofValidator from "./object/TypeofValidator"

export interface ObjectValidationData extends ValidationData
{
    typeof: Constructor
}

export default class ObjectValidation<Schema> extends Validation<Schema, ObjectValidationData>
{
    public validators(): Validators<Schema, ObjectValidationData>
    {
        return merge(super.validators(), {
            typeof: TypeofValidator
        })
    }

    public isValid(model: BaseModel<Schema>, attribute: keyof Schema): boolean
    {
        return typeof model.attributes[attribute] === "object"
    }

    public getErrorMessage(): string
    {
        return "Property {attribute} must be an object"
    }
}