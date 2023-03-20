import ModelSchema from "@data/interfaces/ModelSchema"
import { QueryArrayValueType } from "@data/types/QueryArrayValueType"

import QueryArrayValueExpression from "@foundations/query/QueryArrayValueExpression"


export default interface QueryArrayValueFactory<Schema extends ModelSchema>
{
    getExpression(value: QueryArrayValueType<Schema>): QueryArrayValueExpression<Schema>
}