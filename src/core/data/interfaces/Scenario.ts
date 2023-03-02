import BaseModel from "../../foundations/BaseModel"
import { AsyncAwait } from "../types/AsyncAwait"
import { Keyof } from "../types/Keyof"

export default interface Scenario<Schema>
{
    make(model: BaseModel<Schema>, attribute: Keyof<Schema>): AsyncAwait<void>
}