import { Filter, FilterOperators } from "mongodb"
import ModelSchema from "../../../../data/interfaces/ModelSchema"
import { ValueofModel } from "../../../../data/types/ValueofModel"
import QueryArrayValueExpression from "../../../../foundations/query/QueryArrayValueExpression"

export type QueryArrayHasExpressionValue<Schema extends ModelSchema> = Filter<Schema>

export default class QueryArrayHasExpression<Schema extends ModelSchema> extends QueryArrayValueExpression<Schema, QueryArrayHasExpressionValue<Schema>>
{
    public getValue(): FilterOperators<ValueofModel<Schema>>
    {
        return this.value
    }
}