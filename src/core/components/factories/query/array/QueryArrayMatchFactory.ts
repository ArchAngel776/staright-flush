/* eslint-disable @typescript-eslint/no-unused-vars */
import FilterValueException from "../../../../../exceptions/query/FilterValueException"
import ModelSchema from "../../../../data/interfaces/ModelSchema"
import QueryArrayValueFactory from "../../../../data/interfaces/QueryArrayValueFactory"
import { Constructor } from "../../../../data/types/Constructor"
import { QueryArrayValueType } from "../../../../data/types/QueryArrayValueType"
import CheckNullFilter from "../../../../decorators/query/CheckNullFilter"
import QueryArrayValueExpression from "../../../../foundations/query/QueryArrayValueExpression"
import Method from "../../../../helpers/Method"
import QueryArrayMatchExpression from "../../../../helpers/query/array/match/QueryArrayMatchExpression"

export default class QueryArrayMatchFactory<Schema extends ModelSchema> implements QueryArrayValueFactory<Schema>
{
    @Method(<Constructor<CheckNullFilter<Schema>>> CheckNullFilter)
    public getExpression(value: QueryArrayValueType<Schema>): QueryArrayValueExpression<Schema, QueryArrayValueType<Schema>>
    {
        switch (true) {
            case typeof value === "object":
                return new QueryArrayMatchExpression(value)
            default:
                throw new FilterValueException
        }
    }
}