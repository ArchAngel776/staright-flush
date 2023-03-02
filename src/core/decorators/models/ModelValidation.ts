import ModelSchema from "../../data/interfaces/ModelSchema"
import MethodModel from "../../foundations/MethodModel"
import Model from "../../Model"

export default class ModelValidation<Schema extends ModelSchema> extends MethodModel<Model<Schema>, Promise<boolean>>
{
    public async method(this: Model<Schema>, { original }: ModelValidation<Schema>): Promise<boolean>
    {
        this.errors.clearAllErrors()
        return await this.validate() ? original() : false
    }
}