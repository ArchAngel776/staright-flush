import { Keyof } from "./Keyof"

export type ModelErrorsData<Schema> =
{
    [Key in Keyof<Schema>]?: Array<string>
}