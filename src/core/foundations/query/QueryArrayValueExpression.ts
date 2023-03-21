import { FilterOperators } from "mongodb"

import ModelSchema from "@data/interfaces/ModelSchema"
import { QueryArrayValueType } from "@data/types/QueryArrayValueType"
import { ValueofModel } from "@data/types/ValueofModel"


export default abstract class QueryArrayValueExpression<Schema extends ModelSchema, Type extends QueryArrayValueType<Schema> = QueryArrayValueType<Schema>>
{
    protected value: Type

    public constructor(value: QueryArrayValueType<Schema>)
    {
        this.value = <Type> value
    }

    public abstract getValue(): FilterOperators<ValueofModel<Schema>>
}