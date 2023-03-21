/* eslint-disable @typescript-eslint/no-unused-vars */
import ModelSchema from "@data/interfaces/ModelSchema"
import QueryValueFactory from "@data/interfaces/QueryValueFactory"
import { Constructor } from "@data/types/Constructor"
import type { QueryValueType } from "@data/types/QueryValueType"

import QueryValueExpression from "@foundations/query/QueryValueExpression"
import QueryGreaterExpression from "@helpers/query/values/greater/QueryGreaterExpression"
import Method from "@helpers/Method"
import ExcludeNanComparison from "@decorators/query/ExcludeNanComparison"

import ComparisonNumberTypeException from "@exceptions/query/ComparisonNumberTypeException"


export default class QueryGreaterFactory<Schema extends ModelSchema> implements QueryValueFactory<Schema>
{
    @Method(<Constructor<ExcludeNanComparison<Schema>>> ExcludeNanComparison)
    public getExpression(value: QueryValueType<Schema>): QueryValueExpression<Schema>
    {
        switch (true) {
            case typeof value === "number":
                return new QueryGreaterExpression(value)
            default:
                throw new ComparisonNumberTypeException
        }
    }
}