import { Join, NestedPaths, WithId } from "mongodb"
import ModelSchema from "../interfaces/ModelSchema"

export type KeyofModel<Schema extends ModelSchema> = Join<NestedPaths<WithId<Schema>>, ".">