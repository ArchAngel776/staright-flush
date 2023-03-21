import { FilterOperators } from "mongodb"

import ModelSchema from "@data/interfaces/ModelSchema"
import { ValueofModel } from "@data/types/ValueofModel"

import QueryValueExpression from "@foundations/query/QueryValueExpression"


export type QueryNotInExpressionValue<Schema extends ModelSchema> = Array<ValueofModel<Schema>>

export default class QueryNotInExpression<Schema extends ModelSchema> extends QueryValueExpression<Schema, QueryNotInExpressionValue<Schema>>
{
    public getValue(): FilterOperators<ValueofModel<Schema>>
    {
        return { $nin: this.value }
    }
}