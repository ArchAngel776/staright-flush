import { FilterOperators } from "mongodb"
import ModelSchema from "../../../../data/interfaces/ModelSchema"
import { ValueofModel } from "../../../../data/types/ValueofModel"
import QueryArrayValueExpression from "../../../../foundations/query/QueryArrayValueExpression"

export type QueryArrayExactExpressionValue<Schema extends ModelSchema> = ValueofModel<Schema>

export default class QueryArrayExactExpression<Schema extends ModelSchema> extends QueryArrayValueExpression<Schema, QueryArrayExactExpressionValue<Schema>>
{
    public getValue(): FilterOperators<ValueofModel<Schema>>
    {
        return { $eq: this.value }
    }
}