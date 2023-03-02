import { FilterOperators } from "mongodb"
import ModelSchema from "../../../../data/interfaces/ModelSchema"
import { ValueofModel } from "../../../../data/types/ValueofModel"
import QueryValueExpression from "../../../../foundations/query/QueryValueExpression"

export type QueryLessEqualExpressionValue<Schema extends ModelSchema> = ValueofModel<Schema>

export default class QueryLessEqualExpression<Schema extends ModelSchema> extends QueryValueExpression<Schema, QueryLessEqualExpressionValue<Schema>>
{
    public getValue(): FilterOperators<ValueofModel<Schema>>
    {
        return { $lte: this.value }
    }
}