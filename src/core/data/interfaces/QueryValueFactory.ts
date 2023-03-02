import QueryValueExpression from "../../foundations/query/QueryValueExpression"
import { QueryValueType } from "../types/QueryValueType"
import ModelSchema from "./ModelSchema"

export default interface QueryValueFactory<Schema extends ModelSchema>
{
    getExpression(value: QueryValueType<Schema>): QueryValueExpression<Schema>
}