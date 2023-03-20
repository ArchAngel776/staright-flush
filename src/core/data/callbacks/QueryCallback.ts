import ModelSchema from "@data/interfaces/ModelSchema"
import QueryBuilderInterface from "@data/interfaces/QueryBuilderInterface"


export default interface QueryCallback<Schema extends ModelSchema>
{
    (query: QueryBuilderInterface<Schema>): QueryBuilderInterface<Schema>
}