import { Keyof } from "../../data/types/Keyof"
import BaseModel from "../../foundations/BaseModel"
import MethodModel from "../../foundations/MethodModel"
import Validation, { ValidationData } from "../../foundations/Validation"
import NeastedObjectHelper from "../../helpers/NeastedObjectHelper"
import assert from "../../hooks/assert"
import defined from "../../hooks/defined"

export default class Required<Schema, Data extends ValidationData> extends MethodModel<Validation<Schema, Data>, Promise<void>, [model: BaseModel<Schema>, attribute: Keyof<Schema>]>
{
    public async method(this: Validation<Schema, Data>, { original, validateRequired }: Required<Schema, Data>, model: BaseModel<Schema>, attribute: Keyof<Schema>): Promise<void>
    {
        if (this.properties.required) {
            this.properties.required = undefined
            await validateRequired(model, attribute)
        }

        const helper = new NeastedObjectHelper(<Schema> model.attributes)

        if (defined(helper.get(attribute))) {
            return original(model, attribute)
        }
    }

    public async validateRequired(model: BaseModel<Schema>, attribute: Keyof<Schema>): Promise<void>
    {
        const Validator = this.target.validators().required
        const validator = new Validator(model, attribute)
        assert(await validator.validate(true), validator.getErrorMessage())
    }
}