import { BSONType, BSONTypeAlias } from "mongodb"

import ModelSchema from "@data/interfaces/ModelSchema"
import { ValueofModel } from "@data/types/ValueofModel"
import { Multi } from "@data/types/Multi"


export type QueryValueType<Schema extends ModelSchema> = Multi<ValueofModel<Schema>> | RegExp | BSONType | BSONTypeAlias | boolean