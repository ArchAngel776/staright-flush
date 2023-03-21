import ModelSchema from "@data/interfaces/ModelSchema"
import QueryArrayValueFactory from "@data/interfaces/QueryArrayValueFactory"
import { QueryArrayValueType } from "@data/types/QueryArrayValueType"

import QueryArrayValueExpression from "@foundations/query/QueryArrayValueExpression"
import QueryArrayContainValueExpression from "@helpers/query/array/contain/QueryArrayContainValue"
import QueryArrayContainValuesExpression from "@helpers/query/array/contain/QueryArrayContainValues"


export default class QueryArrayContainFactory<Schema extends ModelSchema> implements QueryArrayValueFactory<Schema>
{
    public getExpression(value: QueryArrayValueType<Schema>): QueryArrayValueExpression<Schema>
    {
        switch (true) {
            case value instanceof Array:
                return new QueryArrayContainValuesExpression(value)
            default:
                return new QueryArrayContainValueExpression(value)
        }
    }
}