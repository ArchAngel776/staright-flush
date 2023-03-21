import ModelSchema from "@data/interfaces/ModelSchema"
import { Constructor } from "@data/types/Constructor"

import Repository from "@foundations/Repository"

import Model from "@core/Model"


export type ModelTimestampsConstructor<Schema extends ModelSchema> = Constructor<Model<Schema> & { 
    collection(): string
    getRepository(): Repository<Schema, Model<Schema>>
}>