import ModelCollection from "@data/interfaces/ModelCollection"
import ModelSchema from "@data/interfaces/ModelSchema"

import Model from "@core/Model"


export type ModelConstructor<Schema extends ModelSchema, Target extends Model<Schema>> = (new (data?: Partial<Schema>) => Target) & ModelCollection & {
    prototype: Target
}