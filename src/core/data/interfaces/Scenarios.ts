import { Keyof } from "../types/Keyof"
import { Multi } from "../types/Multi"
import Scenario from "./Scenario"

export type Scenarios<Schema> =
{
    [property in Keyof<Schema>]?: Multi<Scenario<Schema>>
}