import ModelSchema from "@data/interfaces/ModelSchema"
import { QueryValueType } from "@data/types/QueryValueType"

import QueryValueExpression from "@foundations/query/QueryValueExpression"


export default interface QueryValueFactory<Schema extends ModelSchema>
{
    getExpression(value: QueryValueType<Schema>): QueryValueExpression<Schema>
}