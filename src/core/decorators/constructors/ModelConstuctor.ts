import ModelSchema from "@data/interfaces/ModelSchema"
import { Constructor } from "@data/types/Constructor"
import { AbstractConstructor } from "@data/types/AbstractConstructor"

import Repository from "@foundations/Repository"

import Model from "@core/Model"


type Target<Schema extends ModelSchema> = Model<Schema> & { 
    collection(): string
    getRepository(): Repository<Schema, Model<Schema>>
}

export type ModelConstructor<Schema extends ModelSchema> = Constructor<Target<Schema>> | AbstractConstructor<Target<Schema>>