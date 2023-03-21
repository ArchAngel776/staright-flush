/* eslint-disable @typescript-eslint/no-unused-vars */
import ModelSchema from "@data/interfaces/ModelSchema"
import QueryArrayValueFactory from "@data/interfaces/QueryArrayValueFactory"
import { Constructor } from "@data/types/Constructor"
import type { QueryArrayValueType } from "@data/types/QueryArrayValueType"

import QueryArrayValueExpression from "@foundations/query/QueryArrayValueExpression"
import QueryArrayHasExpression from "@helpers/query/array/has/QueryArrayHasExpression"
import Method from "@helpers/Method"
import CheckNullFilter from "@decorators/query/CheckNullFilter"

import FilterValueException from "@exceptions/query/FilterValueException"


export default class QueryArrayHasFactory<Schema extends ModelSchema> implements QueryArrayValueFactory<Schema>
{
    @Method(<Constructor<CheckNullFilter<Schema>>> CheckNullFilter)
    public getExpression(value: QueryArrayValueType<Schema>): QueryArrayValueExpression<Schema>
    {
        switch (true) {
            case typeof value === "object":
                return new QueryArrayHasExpression(value)
            default:
                throw new FilterValueException
        }
    }
}