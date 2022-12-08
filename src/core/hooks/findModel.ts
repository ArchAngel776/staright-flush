import { Filter } from "mongodb"
import ModelSchema from "../data/interfaces/ModelSchema"
import { ModelConstructor } from "../data/types/ModelContructor"
import { ModelID } from "../data/types/ModelID"
import { Nullable } from "../data/types/Nullable"
import Model from "../Model"
import mongoId from "./mongoId"

export default async function findModel<Schema extends ModelSchema, Target extends Model<Schema>>(Model: ModelConstructor<Schema, Target>, id: ModelID): Promise<Nullable<Target>>
{
    const _id = mongoId(id)
    return _id ? new Model().find(<Filter<Schema>> { _id }) : null
}