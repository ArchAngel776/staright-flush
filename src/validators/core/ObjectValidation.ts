import { Validators } from "../../core/data/interfaces/Validators"
import { Constructor } from "../../core/data/types/Constructor"
import { Keyof } from "../../core/data/types/Keyof"
import BaseModel from "../../core/foundations/BaseModel"
import Validation, { ValidationData } from "../../core/foundations/Validation"
import NeastedObjectHelper from "../../core/helpers/NeastedObjectHelper"
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

    public isValid(model: BaseModel<Schema>, attribute: Keyof<Schema>): boolean
    {
        const helper = new NeastedObjectHelper(<Schema> model.attributes)
        return typeof helper.get(attribute) === "object"
    }

    public getErrorMessage(): string
    {
        return "Property {attribute} must be an object"
    }
}