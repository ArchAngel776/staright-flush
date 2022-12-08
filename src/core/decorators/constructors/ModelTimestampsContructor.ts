import ModelSchema from "../../data/interfaces/ModelSchema"
import { Constructor } from "../../data/types/Constructor"
import Model from "../../Model"

export type ModelTimestampsConstructor<Schema extends ModelSchema> = Constructor<Model<Schema> & { collection(): string }>