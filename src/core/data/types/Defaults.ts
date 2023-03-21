import ModelSchema from "@data/interfaces/ModelSchema"
import { Keyof } from "@data/types/Keyof"
import { Valueof } from "@data/types/Valueof"


export type Defaults<Schema extends ModelSchema> = {
    [Key in Keyof<Schema>]?: Valueof<Schema, Key>
}