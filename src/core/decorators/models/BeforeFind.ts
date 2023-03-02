import { Filter } from "mongodb"
import ModelEvents from "../../data/interfaces/ModelEvents"
import ModelSchema from "../../data/interfaces/ModelSchema"
import { Nullable } from "../../data/types/Nullable"
import { ProjectionData } from "../../data/types/ProjectionData"
import MethodModel from "../../foundations/MethodModel"
import Model from "../../Model"

export default class BeforeFind<Schema extends ModelSchema> extends MethodModel<ModelEvents<Schema>, Promise<Nullable<Model<Schema>>>, [filter: Filter<Schema>, projection?: ProjectionData<Schema>]>
{
    public async method(this: ModelEvents<Schema>, { original }: BeforeFind<Schema>, filter: Filter<Schema>, projection?: ProjectionData<Schema>): Promise<Nullable<Model<Schema>>>
    {
        const data = await this.beforeFind(filter, projection)
        return original(...data)
    }
}