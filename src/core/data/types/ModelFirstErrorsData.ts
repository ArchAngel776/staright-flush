import { Keyof } from "@data/types/Keyof"


export type ModelFirstErrorsData<Schema> = {
    [Key in Keyof<Schema>]?: string
}