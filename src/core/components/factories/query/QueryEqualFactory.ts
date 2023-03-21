import ModelSchema from "@data/interfaces/ModelSchema"
import QueryValueFactory from "@data/interfaces/QueryValueFactory"
import { QueryValueType } from "@data/types/QueryValueType"

import QueryValueExpression from "@foundations/query/QueryValueExpression"
import QueryEqualExpression from "@helpers/query/values/equal/QueryEqualExpression"
import QueryInExpression from "@helpers/query/values/equal/QueryInExpression"
import QueryRegexExpression from "@helpers/query/values/equal/QueryRegexExpression"


export default class QueryEqualFactory<Schema extends ModelSchema> implements QueryValueFactory<Schema>
{
    public getExpression(value: QueryValueType<Schema>): QueryValueExpression<Schema>
    {
        switch (true) {
            case value instanceof Array:
                return new QueryInExpression(value)
            case value instanceof RegExp:
                return new QueryRegexExpression(value)
            default:
                return new QueryEqualExpression(value)
        }
    }
}