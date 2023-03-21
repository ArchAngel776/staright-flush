import { Condition, PropertyType, WithId } from "mongodb"

import { KeyofModel } from "@data/types/KeyofModel"
import ModelSchema from "@data/interfaces/ModelSchema"


export type FilterProperties<Schema extends ModelSchema> =
{
    [Property in KeyofModel<Schema>]?: Condition<PropertyType<WithId<Schema>, Property>>
}