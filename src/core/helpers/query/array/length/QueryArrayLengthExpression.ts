/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterOperators } from "mongodb"

import ModelSchema from "@data/interfaces/ModelSchema"
import { ValueofModel } from "@data/types/ValueofModel"

import QueryArrayValueExpression from "@foundations/query/QueryArrayValueExpression"


export type QueryArrayLengthExpressionValue<Schema extends ModelSchema> = ValueofModel<Schema> extends ReadonlyArray<any> ? number : never

export default class QueryArrayLengthExpression<Schema extends ModelSchema> extends QueryArrayValueExpression<Schema,  QueryArrayLengthExpressionValue<Schema>>
{
    public getValue(): FilterOperators<ValueofModel<Schema>>
    {
        return { $size: this.value }
    }
}