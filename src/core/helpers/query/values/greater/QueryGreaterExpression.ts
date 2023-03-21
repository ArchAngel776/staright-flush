import { FilterOperators } from "mongodb"

import ModelSchema from "@data/interfaces/ModelSchema"
import { ValueofModel } from "@data/types/ValueofModel"

import QueryValueExpression from "@foundations/query/QueryValueExpression"


export type QueryGreaterExpressionValue<Schema extends ModelSchema> = ValueofModel<Schema>

export default class QueryGreaterExpression<Schema extends ModelSchema> extends QueryValueExpression<Schema, QueryGreaterExpressionValue<Schema>>
{
    public getValue(): FilterOperators<ValueofModel<Schema>>
    {
        return { $gt: this.value }
    }
}