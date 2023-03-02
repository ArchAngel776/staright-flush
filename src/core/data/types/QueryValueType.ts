import { BSONType, BSONTypeAlias } from "mongodb"
import ModelSchema from "../interfaces/ModelSchema"
import { Multi } from "./Multi"
import { ValueofModel } from "./ValueofModel"

export type QueryValueType<Schema extends ModelSchema> = Multi<ValueofModel<Schema>> | RegExp | BSONType | BSONTypeAlias | boolean