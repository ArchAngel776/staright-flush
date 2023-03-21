import { Join, NestedPaths, WithId } from "mongodb"

import ModelSchema from "@data/interfaces/ModelSchema"
import { KeyofSign } from "@data/types/Keyof"


export type KeyofModel<Schema extends ModelSchema> = Join<NestedPaths<WithId<Schema>, []>, KeyofSign.JOIN>