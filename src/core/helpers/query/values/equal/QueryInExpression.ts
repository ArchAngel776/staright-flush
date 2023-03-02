import { FilterOperators } from "mongodb"
import ModelSchema from "../../../../data/interfaces/ModelSchema"
import { ValueofModel } from "../../../../data/types/ValueofModel"
import QueryValueExpression from "../../../../foundations/query/QueryValueExpression"

export type QueryInExpressionValue<Schema extends ModelSchema> = Array<ValueofModel<Schema>>

export default class QueryInExpression<Schema extends ModelSchema> extends QueryValueExpression<Schema, QueryInExpressionValue<Schema>>
{
    public getValue(): FilterOperators<ValueofModel<Schema>>
    {
        return { $in: this.value }
    }
}