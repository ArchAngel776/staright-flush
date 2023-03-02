import { FilterOperators } from "mongodb"
import ModelSchema from "../../../../data/interfaces/ModelSchema"
import { ValueofModel } from "../../../../data/types/ValueofModel"
import QueryValueExpression from "../../../../foundations/query/QueryValueExpression"

export type QueryRegexExpressionValue<Schema extends ModelSchema> = ValueofModel<Schema> extends string ? RegExp : never

export default class QueryRegexExpression<Schema extends ModelSchema> extends QueryValueExpression<Schema, QueryRegexExpressionValue<Schema>>
{
    public getValue(): FilterOperators<ValueofModel<Schema>>
    {
        return { $regex: this.value }
    }
}