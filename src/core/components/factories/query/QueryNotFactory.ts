import ModelSchema from "@data/interfaces/ModelSchema"
import QueryValueFactory from "@data/interfaces/QueryValueFactory"
import { QueryValueType } from "@data/types/QueryValueType"

import QueryValueExpression from "@foundations/query/QueryValueExpression"
import QueryNotEqualExpression from "@helpers/query/values/not/QueryNotEqualExpression"
import QueryNotInExpression from "@helpers/query/values/not/QueryNotInExpression"


export default class QueryNotFactory<Schema extends ModelSchema> implements QueryValueFactory<Schema>
{
    public getExpression(value: QueryValueType<Schema>): QueryValueExpression<Schema>
    {
        switch (true) {
            case value instanceof Array:
                return new QueryNotInExpression(value)
            default:
                return new QueryNotEqualExpression(value)
        }
    }
}