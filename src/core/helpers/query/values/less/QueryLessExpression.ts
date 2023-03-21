import { FilterOperators } from "mongodb"

import ModelSchema from "@data/interfaces/ModelSchema"
import { ValueofModel } from "@data/types/ValueofModel"

import QueryValueExpression from "@foundations/query/QueryValueExpression"


export type QueryLessExpressionValue<Schema extends ModelSchema> = ValueofModel<Schema>

export default class QueryLessExpression<Schema extends ModelSchema> extends QueryValueExpression<Schema, QueryLessExpressionValue<Schema>>
{
    public getValue(): FilterOperators<ValueofModel<Schema>>
    {
        return { $lt: this.value }
    }
}