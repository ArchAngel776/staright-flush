import { Filter, FilterOperators } from "mongodb"

import ModelSchema from "@data/interfaces/ModelSchema"
import { ValueofModel } from "@data/types/ValueofModel"
import { Multi } from "@data/types/Multi"


export type QueryArrayValueType<Schema extends ModelSchema> = Multi<ValueofModel<Schema>> | Filter<Schema> | FilterOperators<ValueofModel<Schema>> | number