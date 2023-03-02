import QueryCallback from "../data/callbacks/QueryCallback"
import ModelSchema from "../data/interfaces/ModelSchema"
import { ModelConstructor } from "../data/types/ModelContructor"
import Model from "../Model"
import findAllModelsByQuery from "./findAllModelsByQuery"

export default function deleteModels<Schema extends ModelSchema, Target extends Model<Schema>>(Model: ModelConstructor<Schema, Target>, callback: QueryCallback<Schema>): Promise<number>
{
    return findAllModelsByQuery(Model, callback).then(models => Promise.all(models.map(model => model.delete())).then(result => result.filter(value => value).length))
}