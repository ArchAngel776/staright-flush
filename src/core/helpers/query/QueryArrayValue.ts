import { FilterOperators } from "mongodb"

import { QueryArrayOperator } from "@data/enums/QueryArrayOperator"
import ModelSchema from "@data/interfaces/ModelSchema"
import QueryArrayValueFactory from "@data/interfaces/QueryArrayValueFactory"
import { QueryArrayValueType } from "@data/types/QueryArrayValueType"
import { ValueofModel } from "@data/types/ValueofModel"

import QueryArrayContainFactory from "@components/factories/query/array/QueryArrayContainFactory"
import QueryArrayExactFactory from "@components/factories/query/array/QueryArrayExactFactory"
import QueryArrayHasFactory from "@components/factories/query/array/QueryArrayHasFactory"
import QueryArrayLengthFactory from "@components/factories/query/array/QueryArrayLengthFactory"
import QueryArrayMatchFactory from "@components/factories/query/array/QueryArrayMatchFactory"

import UnknownArrayOperatorException from "@exceptions/UnknownArrayOperatorException"


export default class QueryArrayValue<Schema extends ModelSchema>
{
    protected value: QueryArrayValueType<Schema>

    public constructor(value: QueryArrayValueType<Schema>)
    {
        this.value = value
    }

    public getValue(operator: QueryArrayOperator): FilterOperators<ValueofModel<Schema>>
    {
        return this.getFactory(operator).getExpression(this.value).getValue()
    }

    protected getFactory(operator: QueryArrayOperator): QueryArrayValueFactory<Schema>
    {
        switch (operator) {
            case QueryArrayOperator.EXACT:
                return new QueryArrayExactFactory
            case QueryArrayOperator.CONTAIN:
                return new QueryArrayContainFactory
            case QueryArrayOperator.HAS:
                return new QueryArrayHasFactory
            case QueryArrayOperator.MATCH:
                return new QueryArrayMatchFactory
            case QueryArrayOperator.LENGTH:
                return new QueryArrayLengthFactory
            default:
                throw new UnknownArrayOperatorException(operator)
        }
    }
}