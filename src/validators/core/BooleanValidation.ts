import { Validators } from "@data/interfaces/Validators"
import { Keyof } from "@data/types/Keyof"

import BaseModel from "@foundations/BaseModel"
import Validation, { ValidationData } from "@foundations/Validation"
import NeastedObjectHelper from "@helpers/NeastedObjectHelper"

import merge from "@hooks/merge"

import AlwaysValidator from "@validators/core/boolean/AlwaysValidator"


export interface BooleanValidationData<Schema> extends ValidationData<Schema>
{
    always: boolean
}

export default class BooleanValidation<Schema> extends Validation<Schema, BooleanValidationData<Schema>>
{
    public validators(): Validators<Schema, BooleanValidationData<Schema>>
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