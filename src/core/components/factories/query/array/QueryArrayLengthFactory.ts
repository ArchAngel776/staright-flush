/* eslint-disable @typescript-eslint/no-unused-vars */
import LengthNumberTypeException from "@exceptions/query/LengthNumberTypeException"
import ModelSchema from "@data/interfaces/ModelSchema"
import QueryArrayValueFactory from "@data/interfaces/QueryArrayValueFactory"
import { Constructor } from "@data/types/Constructor"
import type { QueryArrayValueType } from "@data/types/QueryArrayValueType"

import QueryArrayValueExpression from "@foundations/query/QueryArrayValueExpression"
import Method from "@helpers/Method"
import QueryArrayLengthExpression from "@helpers/query/array/length/QueryArrayLengthExpression"
import ExcludeNanLength from "@decorators/query/ExcludeNanLength"


export default class QueryArrayLengthFactory<Schema extends ModelSchema> implements QueryArrayValueFactory<Schema>
{
    @Method(<Constructor<ExcludeNanLength<Schema>>> ExcludeNanLength)
    public getExpression(value: QueryArrayValueType<Schema>): QueryArrayValueExpression<Schema>
    {
        switch (true) {
            case typeof value === "number":
                return new QueryArrayLengthExpression(value)
            default:
                throw new LengthNumberTypeException
        }
    }
}