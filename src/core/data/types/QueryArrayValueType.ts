import { Filter, FilterOperators } from "mongodb"
import ModelSchema from "../interfaces/ModelSchema"
import { Multi } from "./Multi"
import { ValueofModel } from "./ValueofModel"

export type QueryArrayValueType<Schema extends ModelSchema> = Multi<ValueofModel<Schema>> | Filter<Schema> | FilterOperators<ValueofModel<Schema>> | number