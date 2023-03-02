import { FilterOperators } from "mongodb"
import ModelSchema from "../../data/interfaces/ModelSchema"
import { QueryValueType } from "../../data/types/QueryValueType"
import { ValueofModel } from "../../data/types/ValueofModel"

export default abstract class QueryValueExpression<Schema extends ModelSchema, Type extends QueryValueType<Schema> = QueryValueType<Schema>>
{
    protected value: Type

    public constructor(value: QueryValueType<Schema>)
    {
        this.value = <Type> value
    }

    public abstract getValue(): FilterOperators<ValueofModel<Schema>>
}