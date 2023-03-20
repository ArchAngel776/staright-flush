import ModelSchema from "@data/interfaces/ModelSchema"
import QueryValueFactory from "@data/interfaces/QueryValueFactory"
import { QueryValueType } from "@data/types/QueryValueType"

import QueryValueExpression from "@foundations/query/QueryValueExpression"
import QueryTypeExpression from "@helpers/query/values/type/QueryTypeExpression"

import QueryTypeValueException from "@exceptions/QueryTypeValueException"


export default class QueryTypeFactory<Schema extends ModelSchema> implements QueryValueFactory<Schema>
{
    public getExpression(value: QueryValueType<Schema>): QueryValueExpression<Schema>
    {
        switch (true) {
            case typeof value === "number":
            case typeof value === "string":
                return new QueryTypeExpression(value)
            default:
                throw new QueryTypeValueException
        }
    }
}