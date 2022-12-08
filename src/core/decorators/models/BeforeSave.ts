import ModelEvents from "../../data/interfaces/ModelEvents"
import ModelSchema from "../../data/interfaces/ModelSchema"
import MethodModel from "../../foundations/MethodModel"

export default class BeforeSave<Schema extends ModelSchema> extends MethodModel<ModelEvents<Schema>, Promise<boolean>>
{
    public async method(): Promise<boolean> 
    {
        return (await this.target.beforeSave()) ? this.original() : false
    }
}