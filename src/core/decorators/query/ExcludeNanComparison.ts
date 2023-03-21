import ModelSchema from "@data/interfaces/ModelSchema"
import QueryValueFactory from "@data/interfaces/QueryValueFactory"

import MethodModel from "@foundations/MethodModel"
import QueryValueExpression from "@foundations/query/QueryValueExpression"

import assert from "@hooks/assert"

import ComparisonNanNumberException from "@exceptions/query/ComparisonNanNumberException"


export default class ExcludeNanComparison<Schema extends ModelSchema> extends MethodModel<QueryValueFactory<Schema>, QueryValueExpression<Schema>, [value: number]>
{
    public method(this: QueryValueFactory<Schema>, { original }: ExcludeNanComparison<Schema>, value: number): QueryValueExpression<Schema>
    {
        const expression = original(value)
        assert(!isNaN(value), new ComparisonNanNumberException)
        return expression
    }
}