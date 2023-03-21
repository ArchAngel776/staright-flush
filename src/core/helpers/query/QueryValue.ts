import { FilterOperators } from "mongodb"

import { QueryOperator } from "@data/enums/QueryOperator"
import ModelSchema from "@data/interfaces/ModelSchema"
import QueryValueFactory from "@data/interfaces/QueryValueFactory"
import { QueryValueType } from "@data/types/QueryValueType"
import { ValueofModel } from "@data/types/ValueofModel"

import QueryEqualFactory from "@components/factories/query/QueryEqualFactory"
import QueryExistsFactory from "@components/factories/query/QueryExistsFactory"
import QueryGreaterEqualFactory from "@components/factories/query/QueryGreaterEqualFactory"
import QueryGreaterFactory from "@components/factories/query/QueryGreaterFactory"
import QueryLessEqualFactory from "@components/factories/query/QueryLessEqualFactory"
import QueryLessFactory from "@components/factories/query/QueryLessFactory"
import QueryNotFactory from "@components/factories/query/QueryNotFactory"
import QueryTypeFactory from "@components/factories/query/QueryTypeFactory"

import UnknownOperatorException from "@exceptions/UnknownOperatorException"


export default class QueryValue<Schema extends ModelSchema>
{
    protected value: QueryValueType<Schema>

    public constructor(value: QueryValueType<Schema>)
    {
        this.value = value
    }

    public getValue(operator: QueryOperator): FilterOperators<ValueofModel<Schema>>
    {
        return this.getFactory(operator).getExpression(this.value).getValue()
    }

    protected getFactory(operator: QueryOperator): QueryValueFactory<Schema>
    {
        switch (operator) {
            case QueryOperator.EQ:
                return new QueryEqualFactory
            case QueryOperator.LT:
                return new QueryLessFactory
            case QueryOperator.LTE:
                return new QueryLessEqualFactory
            case QueryOperator.GT:
                return new QueryGreaterFactory
            case QueryOperator.GTE:
                return new QueryGreaterEqualFactory
            case QueryOperator.TYPE:
                return new QueryTypeFactory
            case QueryOperator.EXISTS:
                return new QueryExistsFactory
            case QueryOperator.NOT:
                return new QueryNotFactory
            default:
                throw new UnknownOperatorException(operator)
        }
    }
}