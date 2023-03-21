import ModelCollection from "@data/interfaces/ModelCollection"
import ModelSchema from "@data/interfaces/ModelSchema"
import { Keyof } from "@data/types/Keyof"
import { ModelConstructor } from "@data/types/ModelContructor"
import { Nullable } from "@data/types/Nullable"

import Model from "@core/Model"


export default class Unique
{
    protected model: ModelCollection

    protected keypath: Nullable<string>

    public constructor(model: ModelCollection, keypath?: string)
    {
        this.model = model
        this.keypath = keypath || null
    }

    public getModel(): ModelCollection
    {
        return this.model
    }

    public get keyPath(): Nullable<string>
    {
        return this.keypath
    }

    public static collection<Schema extends ModelSchema>(Model: ModelConstructor<Schema, Model<Schema>>, keypath?: Keyof<Schema>): Unique
    {
        return new Unique(Model, keypath)
    }
}