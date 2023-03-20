import { AlternativeType, PropertyType, WithId } from "mongodb"

import ModelSchema from "@data/interfaces/ModelSchema"
import { KeyofModel } from "@data/types/KeyofModel"


export type ValueofModel<Schema extends ModelSchema> = AlternativeType<PropertyType<WithId<Schema>, KeyofModel<Schema>>>