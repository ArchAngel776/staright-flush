import QueryBuilder from "../components/builders/QueryBuilder"
import QueryCallback from "../data/callbacks/QueryCallback"
import ModelSchema from "../data/interfaces/ModelSchema"
import { ModelConstructor } from "../data/types/ModelContructor"
import { Nullable } from "../data/types/Nullable"
import Model from "../Model"

export default function findModelByQuery<Schema extends ModelSchema, Target extends Model<Schema>>(Model: ModelConstructor<Schema, Target>, callback: QueryCallback<Schema>): Promise<Nullable<Target>>
{
    const query = callback(new QueryBuilder)
    return new Model().find(query.getFilter(), query.getProjection())
}