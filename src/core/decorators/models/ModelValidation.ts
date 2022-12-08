import ModelSchema from "../../data/interfaces/ModelSchema"
import MethodModel from "../../foundations/MethodModel"
import Model from "../../Model"

export default class ModelValidation<Schema extends ModelSchema> extends MethodModel<Model<Schema>, Promise<boolean>>
{
    public async method(): Promise<boolean>
    {
        this.target.errors.clearAllErrors()
        return await this.target.validate() ? this.original() : false
    }
}