import BaseModel from "../../foundations/BaseModel"
import MethodModel from "../../foundations/MethodModel"
import Validation, { ValidationData } from "../../foundations/Validation"
import defined from "../../hooks/defined"

export default class Required<Schema, Data extends ValidationData> extends MethodModel<Validation<Schema, Data>, Promise<void>, [BaseModel<Schema>, keyof Schema]>
{
    public async method(model: BaseModel<Schema>, attribute: keyof Schema): Promise<void>
    {
        if (this.target.properties.required) {
            this.target.properties.required = undefined
            await this.validateRequired(model, attribute)
        }

        if (defined(model.attributes[attribute])) {
            return this.original(model, attribute)
        }
    }

    protected async validateRequired(model: BaseModel<Schema>, attribute: keyof Schema): Promise<void>
    {
        const Validator = this.target.validators().required
        const validator = new Validator(model, attribute)
        if (!await validator.validate(true)) {
            throw validator.getErrorMessage()
        }
    }
}