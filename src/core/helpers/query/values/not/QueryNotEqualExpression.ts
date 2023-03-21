import { FilterOperators } from "mongodb"

import ModelSchema from "@data/interfaces/ModelSchema"
import { ValueofModel } from "@data/types/ValueofModel"

import QueryValueExpression from "@foundations/query/QueryValueExpression"


export type QueryNotEqualExpressionValue<Schema extends ModelSchema> = ValueofModel<Schema>

export default class QueryNotEqualExpression<Schema extends ModelSchema> extends QueryValueExpression<Schema, QueryNotEqualExpressionValue<Schema>>
{
    public getValue(): FilterOperators<ValueofModel<Schema>>
    {
        return { $ne: this.value }
    }
}