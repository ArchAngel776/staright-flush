import ModelSchema from "../../data/interfaces/ModelSchema"
import { Constructor } from "../../data/types/Constructor"
import { ModelConstructor } from "../../data/types/ModelContructor"
import Model from "../../Model"

export type ModelTimestampsConstructor<Schema extends ModelSchema> = Constructor<Model<Schema> & { 
    collection(): string
    getModel(): ModelConstructor<Schema, Model<Schema>>
}>