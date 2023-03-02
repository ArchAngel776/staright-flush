import { AlternativeType, PropertyType, WithId } from "mongodb"
import ModelSchema from "../interfaces/ModelSchema"
import { KeyofModel } from "./KeyofModel"

export type ValueofModel<Schema extends ModelSchema> = AlternativeType<PropertyType<WithId<Schema>, KeyofModel<Schema>>>