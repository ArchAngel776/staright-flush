import ExistsBooleanValueException from "../../../../exceptions/query/ExistsBooleanValueException"
import ModelSchema from "../../../data/interfaces/ModelSchema"
import QueryValueFactory from "../../../data/interfaces/QueryValueFactory"
import { QueryValueType } from "../../../data/types/QueryValueType"
import QueryValueExpression from "../../../foundations/query/QueryValueExpression"
import QueryExistsExpression from "../../../helpers/query/values/exists/QueryExistsExpression"

export default class QueryExistsFactory<Schema extends ModelSchema> implements QueryValueFactory<Schema>
{
    public getExpression(value: QueryValueType<Schema>): QueryValueExpression<Schema>
    {
        switch (true) {
            case typeof value === "boolean":
                return new QueryExistsExpression(value)
            default:
                throw new ExistsBooleanValueException
        }
    }
}