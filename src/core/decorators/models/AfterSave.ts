import ModelEvents from "../../data/interfaces/ModelEvents"
import ModelSchema from "../../data/interfaces/ModelSchema"
import MethodModel from "../../foundations/MethodModel"

export default class AfterSave<Schema extends ModelSchema> extends MethodModel<ModelEvents<Schema>, Promise<boolean>>
{
    public async method(): Promise<boolean>
    {
        const result = await this.original()
        await this.target.afterSave()
        return result
    }
}