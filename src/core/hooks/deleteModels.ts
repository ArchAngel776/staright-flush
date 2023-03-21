import QueryCallback from "@data/callbacks/QueryCallback"
import ModelSchema from "@data/interfaces/ModelSchema"
import { ModelConstructor } from "@data/types/ModelContructor"
import { TransactionData } from "@data/types/TransactionData"

import findAllModelsByQuery from "@hooks/findAllModelsByQuery"

import Model from "@core/Model"


export default async function deleteModels<Schema extends ModelSchema, Target extends Model<Schema>>(Model: ModelConstructor<Schema, Target>, callback: QueryCallback<Schema>, transaction?: TransactionData): Promise<number>
{
    const models = await findAllModelsByQuery(Model, callback)
    const result = await Promise.all(models.map(model => model.withTransaction(transaction).delete()))
    return result.filter(value => value).length
}