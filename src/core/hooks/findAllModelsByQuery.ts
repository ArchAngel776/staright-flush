import QueryCallback from "@data/callbacks/QueryCallback"
import ModelSchema from "@data/interfaces/ModelSchema"
import { ModelConstructor } from "@data/types/ModelContructor"
import { TransactionData } from "@data/types/TransactionData"

import QueryBuilder from "@components/builders/QueryBuilder"

import Model from "@core/Model"


export default function findAllModelsByQuery<Schema extends ModelSchema, Target extends Model<Schema>>(Model: ModelConstructor<Schema, Target>, callback: QueryCallback<Schema>, transaction?: TransactionData): Promise<Array<Target>>
{
    const query = callback(new QueryBuilder)
    return new Model().withTransaction(transaction).findAll(query.getFilter(), query.getProjection())
}