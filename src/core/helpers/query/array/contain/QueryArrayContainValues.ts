import { FilterOperators } from "mongodb"

import ModelSchema from "@data/interfaces/ModelSchema"
import { ValueofModel } from "@data/types/ValueofModel"

import QueryArrayValueExpression from "@foundations/query/QueryArrayValueExpression"


export type QueryArrayContainValuesExpressionValue<Schema extends ModelSchema> = Array<ValueofModel<Schema>>

export default class QueryArrayContainValuesExpression<Schema extends ModelSchema> extends QueryArrayValueExpression<Schema, QueryArrayContainValuesExpressionValue<Schema>>
{
    public getValue(): FilterOperators<ValueofModel<Schema>>
    {
        return { $all: this.value }
    }
}