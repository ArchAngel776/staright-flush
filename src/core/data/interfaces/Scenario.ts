import { AsyncAwait } from "@data/types/AsyncAwait"
import { Keyof } from "@data/types/Keyof"

import BaseModel from "@foundations/BaseModel"


export default interface Scenario<Schema>
{
    make(model: BaseModel<Schema>, attribute: Keyof<Schema>): AsyncAwait<void>
}