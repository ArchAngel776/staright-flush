import ModelEvents from "../../data/interfaces/ModelEvents"
import ModelSchema from "../../data/interfaces/ModelSchema"
import MethodModel from "../../foundations/MethodModel"

export default class BeforeSave<Schema extends ModelSchema> extends MethodModel<ModelEvents<Schema>, Promise<boolean>>
{
    public async method(this: ModelEvents<Schema>, { original }: BeforeSave<Schema>): Promise<boolean> 
    {
        return await this.beforeSave() ? original() : false
    }
}