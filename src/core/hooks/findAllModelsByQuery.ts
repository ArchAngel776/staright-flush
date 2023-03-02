import QueryBuilder from "../components/builders/QueryBuilder"
import QueryCallback from "../data/callbacks/QueryCallback"
import ModelSchema from "../data/interfaces/ModelSchema"
import { ModelConstructor } from "../data/types/ModelContructor"
import Model from "../Model"

export default function findAllModelsByQuery<Schema extends ModelSchema, Target extends Model<Schema>>(Model: ModelConstructor<Schema, Target>, callback: QueryCallback<Schema>): Promise<Array<Target>>
{
    const query = callback(new QueryBuilder)
    return new Model().findAll(query.getFilter(), query.getProjection())
}