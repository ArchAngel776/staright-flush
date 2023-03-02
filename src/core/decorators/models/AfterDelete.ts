import ModelEvents from "../../data/interfaces/ModelEvents"
import ModelSchema from "../../data/interfaces/ModelSchema"
import MethodModel from "../../foundations/MethodModel"

export default class AfterDelete<Schema extends ModelSchema> extends MethodModel<ModelEvents<Schema>, Promise<boolean>>
{
    public async method(this: ModelEvents<Schema>, { original }: AfterDelete<Schema>): Promise<boolean>
    {
        const result = await original()
        await this.afterDelete()
        return result
    }
}