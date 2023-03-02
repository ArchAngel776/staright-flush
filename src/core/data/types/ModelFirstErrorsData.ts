import { Keyof } from "./Keyof"

export type ModelFirstErrorsData<Schema> =
{
    [Key in Keyof<Schema>]?: string
}