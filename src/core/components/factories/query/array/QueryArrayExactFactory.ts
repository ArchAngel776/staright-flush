import ModelSchema from "@data/interfaces/ModelSchema"
import QueryArrayValueFactory from "@data/interfaces/QueryArrayValueFactory"
import { QueryArrayValueType } from "@data/types/QueryArrayValueType"

import QueryArrayValueExpression from "@foundations/query/QueryArrayValueExpression"
import QueryArrayExactExpression from "@helpers/query/array/exact/QueryArrayExactExpression"

import QuerySingleValueException from "@exceptions/query/QuerySingleValueException"


export default class QueryArrayExactFactory<Schema extends ModelSchema> implements QueryArrayValueFactory<Schema>
{
    public getExpression(value: QueryArrayValueType<Schema>): QueryArrayValueExpression<Schema>
    {
        switch (true) {
            case value instanceof Array:
                return new QueryArrayExactExpression(value)
            default:
                throw new QuerySingleValueException
        }
    }
}