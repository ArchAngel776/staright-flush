import ModelSchema from "@data/interfaces/ModelSchema"

import Model from "@core/Model"


export type SchemaOfModel<Target> = Target extends Model<infer Schema> ? Schema extends ModelSchema ? Schema : never : never