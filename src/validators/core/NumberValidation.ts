import { Validators } from "../../core/data/interfaces/Validators"
import { Keyof } from "../../core/data/types/Keyof"
import BaseModel from "../../core/foundations/BaseModel"
import Validation, { ValidationData } from "../../core/foundations/Validation"
import NeastedObjectHelper from "../../core/helpers/NeastedObjectHelper"
import merge from "../../core/hooks/merge"
import DividedValidator from "./number/DividedValidator"
import MaxValidator from "./number/MaxValidator"
import MinValidator from "./number/MinValidator"

export interface NumberValidationData extends ValidationData
{
    min: number
    max: number
    divided: number
}

export default class NumberValidation<Schema> extends Validation<Schema, NumberValidationData>
{
    public validators(): Validators<Schema, NumberValidationData>
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