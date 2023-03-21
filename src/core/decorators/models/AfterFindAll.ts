import { Filter } from "mongodb"

import ModelEvents from "@data/interfaces/ModelEvents"
import ModelSchema from "@data/interfaces/ModelSchema"
import { ProjectionData } from "@data/types/ProjectionData"

import MethodModel from "@foundations/MethodModel"

import Model from "@core/Model"


export default class AfterFindAll<Schema extends ModelSchema> extends MethodModel<ModelEvents<Schema>, Promise<Array<Model<Schema>>>, [filter: Filter<Schema>, projection?: ProjectionData<Schema>]>
{
    public async method(this: ModelEvents<Schema>, { original }: AfterFindAll<Schema>, filter: Filter<Schema>, projection?: ProjectionData<Schema>): Promise<Array<Model<Schema>>>
    {
        const result = await original(filter, projection)
        await Promise.all(result.map(model => model.afterFind()))
        return result
    }
}