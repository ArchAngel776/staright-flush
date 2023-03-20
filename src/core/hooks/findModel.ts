import { Filter } from "mongodb"

import ModelSchema from "@data/interfaces/ModelSchema"
import { ModelConstructor } from "@data/types/ModelContructor"
import { ModelID } from "@data/types/ModelID"
import { Nullable } from "@data/types/Nullable"
import { TransactionData } from "@data/types/TransactionData"

import mongoId from "@hooks/mongoId"

import Model from "@core/Model"


export default async function findModel<Schema extends ModelSchema, Target extends Model<Schema>>(Model: ModelConstructor<Schema, Target>, id: ModelID, transaction?: TransactionData): Promise<Nullable<Target>>
{
    const _id = mongoId(id)
    return _id ? new Model().withTransaction(transaction).find(<Filter<Schema>> { _id }) : null
}