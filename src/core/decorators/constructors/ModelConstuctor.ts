import ModelSchema from "../../data/interfaces/ModelSchema"
import { Constructor } from "../../data/types/Constructor"
import Model from "../../Model"
import * as MC from "../../data/types/ModelContructor"

export type ModelConstructor<Schema extends ModelSchema> = Constructor<Model<Schema> & { 
    collection(): string
    getModel(): MC.ModelConstructor<Schema, Model<Schema>>
}>