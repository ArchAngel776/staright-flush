import { Keyof } from "@data/types/Keyof"


export type ModelErrorsData<Schema> = {
    [Key in Keyof<Schema>]?: Array<string>
}