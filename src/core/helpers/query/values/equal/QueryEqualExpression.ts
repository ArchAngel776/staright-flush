import { FilterOperators } from "mongodb"
import ModelSchema from "../../../../data/interfaces/ModelSchema"
import { ValueofModel } from "../../../../data/types/ValueofModel"
import QueryValueExpression from "../../../../foundations/query/QueryValueExpression"

export type QueryEqualExpressionValue<Schema extends ModelSchema> = ValueofModel<Schema>

export default class QueryEqualExpression<Schema extends ModelSchema> extends QueryValueExpression<Schema, QueryEqualExpressionValue<Schema>>
{
    public getValue(): FilterOperators<ValueofModel<Schema>>
    {
        return { $eq: this.value }
    }
}