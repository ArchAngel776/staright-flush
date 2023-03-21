import { FilterOperators } from "mongodb"

import ModelSchema from "@data/interfaces/ModelSchema"
import { ValueofModel } from "@data/types/ValueofModel"

import QueryValueExpression from "@foundations/query/QueryValueExpression"


export default class QueryExistsExpression<Schema extends ModelSchema> extends QueryValueExpression<Schema, boolean>
{
    public getValue(): FilterOperators<ValueofModel<Schema>>
    {
        return { $exists: this.value }
    }
}