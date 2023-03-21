import ModelSchema from "@data/interfaces/ModelSchema"
import QueryArrayValueFactory from "@data/interfaces/QueryArrayValueFactory"

import MethodModel from "@foundations/MethodModel"
import QueryArrayValueExpression from "@foundations/query/QueryArrayValueExpression"

import assert from "@hooks/assert"

import LengthNanNumberException from "@exceptions/query/LengthNanNumberException"


export default class ExcludeNanLength<Schema extends ModelSchema> extends MethodModel<QueryArrayValueFactory<Schema>, QueryArrayValueExpression<Schema>, [value: number]>
{
    public method(this: QueryArrayValueFactory<Schema>, { original }: ExcludeNanLength<Schema>, value: number): QueryArrayValueExpression<Schema>
    {
        const expression = original(value)
        assert(!isNaN(value), new LengthNanNumberException)
        return expression
    }
}