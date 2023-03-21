import { Keyof } from "@data/types/Keyof"
import { Multi } from "@data/types/Multi"
import Scenario from "@data/interfaces/Scenario"


export type Scenarios<Schema> =
{
    [property in Keyof<Schema>]?: Multi<Scenario<Schema>>
}