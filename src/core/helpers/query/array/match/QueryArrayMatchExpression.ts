import { Filter, FilterOperators } from "mongodb"
import ModelSchema from "../../../../data/interfaces/ModelSchema"
import { ValueofModel } from "../../../../data/types/ValueofModel"
import QueryArrayValueExpression from "../../../../foundations/query/QueryArrayValueExpression"

export type QueryArrayMatchExpressionValue<Schema extends ModelSchema> = Filter<Schema>

export default class QueryArrayMatchExpression<Schema extends ModelSchema> extends QueryArrayValueExpression<Schema, QueryArrayMatchExpressionValue<Schema>>
{
    public getValue(): FilterOperators<ValueofModel<Schema>>
    {
        return { $elemMatch: this.value }
    }
}