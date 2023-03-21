import { Filter } from "mongodb"

import ModelEvents from "@data/interfaces/ModelEvents"
import ModelSchema from "@data/interfaces/ModelSchema"
import { AsyncAwait } from "@data/types/AsyncAwait"
import { Nullable } from "@data/types/Nullable"
import { ProjectionData } from "@data/types/ProjectionData"

import MethodModel from "@foundations/MethodModel"

import Model from "@core/Model"


export default class AfterFind<Schema extends ModelSchema> extends MethodModel<ModelEvents<Schema>, Promise<Nullable<Model<Schema>>>, [filter: Filter<Schema>, projection?: ProjectionData<Schema>]>
{
    public async method(this: ModelEvents<Schema>, { original, runAfterFind }: AfterFind<Schema>, filter: Filter<Schema>, projection?: ProjectionData<Schema>): Promise<Nullable<Model<Schema>>>
    {
        const result = await original(filter, projection)
        if (result) {
            await runAfterFind(result)
        }
        return result
    }

    public runAfterFind(model: ModelEvents<Schema>): AsyncAwait<void>
    {
        return model.afterFind()
    }
}