import Model from "../../Model"
import ModelSchema from "../interfaces/ModelSchema"

export type ModelConstructor<Schema extends ModelSchema, Target extends Model<Schema>> = new (data?: Partial<Schema>) => Target