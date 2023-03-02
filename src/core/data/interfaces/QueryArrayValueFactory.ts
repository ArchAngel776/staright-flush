import QueryArrayValueExpression from "../../foundations/query/QueryArrayValueExpression"
import { QueryArrayValueType } from "../types/QueryArrayValueType"
import ModelSchema from "./ModelSchema"

export default interface QueryArrayValueFactory<Schema extends ModelSchema>
{
    getExpression(value: QueryArrayValueType<Schema>): QueryArrayValueExpression<Schema>
}