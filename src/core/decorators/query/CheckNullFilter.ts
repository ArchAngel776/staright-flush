import FilterValueException from "../../../exceptions/query/FilterValueException"
import ModelSchema from "../../data/interfaces/ModelSchema"
import QueryArrayValueFactory from "../../data/interfaces/QueryArrayValueFactory"
import { QueryArrayValueType } from "../../data/types/QueryArrayValueType"
import MethodModel from "../../foundations/MethodModel"
import QueryArrayValueExpression from "../../foundations/query/QueryArrayValueExpression"
import except from "../../hooks/except"

export default class CheckNullFilter<Schema extends ModelSchema> extends MethodModel<QueryArrayValueFactory<Schema>, QueryArrayValueExpression<Schema>, [value: QueryArrayValueType<Schema>]>
{
    public method(this: QueryArrayValueFactory<Schema>, { original }: CheckNullFilter<Schema>, value: QueryArrayValueType<Schema>): QueryArrayValueExpression<Schema>
    {
        return value === null ? except(new FilterValueException) : original(value)
    }
}