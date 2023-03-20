import { Validators } from "@data/interfaces/Validators"
import { Keyof } from "@data/types/Keyof"

import BaseModel from "@foundations/BaseModel"
import Validation, { ValidationData } from "@foundations/Validation"
import NeastedObjectHelper from "@helpers/NeastedObjectHelper"

import merge from "@hooks/merge"

import MaxValidator from "@validators/core/string/MaxValidator"
import MinValidator from "@validators/core/string/MinValidator"
import LengthValidator from "@validators/core/string/LengthValidator"
import PatternValidator from "@validators/core/string/PatternValidator"


export interface StringValidationData<Schema> extends ValidationData<Schema>
{
    min: number
    max: number
    length: number
    pattern: RegExp
}

export default class StringValidation<Schema> extends Validation<Schema, StringValidationData<Schema>>
{
    public validators(): Validators<Schema, StringValidationData<Schema>>
    {
        return merge(super.validators(), {
            min: MinValidator,
            max: MaxValidator,
            length: LengthValidator,
            pattern: PatternValidator
        })
    }

    public isValid(model: BaseModel<Schema>, attribute: Keyof<Schema>): boolean
    {
        const helper = new NeastedObjectHelper(<Schema> model.attributes)
        return typeof helper.get(attribute) === "string"
    }

    public getErrorMessage(): string
    {
        return "Property {attribute} must be a string"
    }
}