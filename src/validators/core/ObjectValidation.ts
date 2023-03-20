import { Validators } from "@data/interfaces/Validators"
import { Constructor } from "@data/types/Constructor"
import { Keyof } from "@data/types/Keyof"

import BaseModel from "@foundations/BaseModel"
import Validation, { ValidationData } from "@foundations/Validation"
import NeastedObjectHelper from "@helpers/NeastedObjectHelper"

import merge from "@hooks/merge"

import TypeofValidator from "@validators/core/object/TypeofValidator"


export interface ObjectValidationData<Schema> extends ValidationData<Schema>
{
    typeof: Constructor
}

export default class ObjectValidation<Schema> extends Validation<Schema, ObjectValidationData<Schema>>
{
    public validators(): Validators<Schema, ObjectValidationData<Schema>>
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