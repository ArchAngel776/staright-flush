import { Keyof } from "./Keyof"
import { Valueof } from "./Valueof"

export type Defaults<Schema> = {
    [Key in Keyof<Schema>]?: Valueof<Schema, Key>
}