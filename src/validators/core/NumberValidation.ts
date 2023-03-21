import { Validators } from "@data/interfaces/Validators"
import { Keyof } from "@data/types/Keyof"

import BaseModel from "@foundations/BaseModel"
import Validation, { ValidationData } from "@foundations/Validation"
import NeastedObjectHelper from "@helpers/NeastedObjectHelper"

import merge from "@hooks/merge"

import DividedValidator from "@validators/core/number/DividedValidator"
import MaxValidator from "@validators/core/number/MaxValidator"
import MinValidator from "@validators/core/number/MinValidator"


export interface NumberValidationData<Schema> extends ValidationData<Schema>
{
    min: number
    max: number
    divided: number
}

export default class NumberValidation<Schema> extends Validation<Schema, NumberValidationData<Schema>>
{
    public validators(): Validators<Schema, NumberValidationData<Schema>>
    {
        return merge(super.validators(), {
            min: MinValidator,
            max: MaxValidator,
            divided: DividedValidator
        })
    }

    public isValid(model: BaseModel<Schema>, attribute: Keyof<Schema>): boolean
    {
        const helper = new NeastedObjectHelper(<Schema> model.attributes)
        return typeof helper.get(attribute) === "number"
    }

    public getErrorMessage(): string
    {
        return "Property {attribute} must be a number"
    }
}