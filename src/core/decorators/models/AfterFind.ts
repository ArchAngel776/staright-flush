import { Filter } from "mongodb"
import ModelEvents from "../../data/interfaces/ModelEvents"
import ModelSchema from "../../data/interfaces/ModelSchema"
import { Nullable } from "../../data/types/Nullable"
import MethodModel from "../../foundations/MethodModel"
import Model from "../../Model"

export default class AfterFind<Schema extends ModelSchema> extends MethodModel<ModelEvents<Schema>, Promise<Nullable<Model<Schema>>>, [Filter<Schema>]>
{
    public async method(filter: Filter<Schema>): Promise<Nullable<Model<Schema>>>
    {
        const result = await this.original(filter)
        await this.target.afterFind()
        return result
    }
}