import ModelSchema from "../interfaces/ModelSchema"
import QueryBuilderInterface from "../interfaces/QueryBuilderInterface"

export default interface QueryCallback<Schema extends ModelSchema>
{
    (query: QueryBuilderInterface<Schema>): QueryBuilderInterface<Schema>
}