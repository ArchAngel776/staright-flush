import BaseModel from "../../foundations/BaseModel"
import { AsyncAwait } from "../types/AsyncAwait"

export default interface Scenario<Schema>
{
    make(model: BaseModel<Schema>, attribute: keyof Schema): AsyncAwait<void>
}