import { KeyofModel } from "./KeyofModel"
import ModelSchema from "../interfaces/ModelSchema"
import { Condition, PropertyType, WithId } from "mongodb"

export type FilterProperties<Schema extends ModelSchema> =
{
    [Property in KeyofModel<Schema>]?: Condition<PropertyType<WithId<Schema>, Property>>
}