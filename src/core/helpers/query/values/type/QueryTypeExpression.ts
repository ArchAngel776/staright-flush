import { BSONType, BSONTypeAlias, FilterOperators } from "mongodb"
import ModelSchema from "../../../../data/interfaces/ModelSchema"
import { ValueofModel } from "../../../../data/types/ValueofModel"
import QueryValueExpression from "../../../../foundations/query/QueryValueExpression"

export default class QueryTypeExpression<Schema extends ModelSchema> extends QueryValueExpression<Schema, BSONType | BSONTypeAlias>
{
    public getValue(): FilterOperators<ValueofModel<Schema>>
    {
        return { $type: this.value }
    }
}