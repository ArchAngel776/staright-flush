import { Filter } from "mongodb"
import { AsyncAwait } from "../types/AsyncAwait"

export default interface ModelEvents<Schema>
{
    beforeFind(filter: Filter<Schema>): AsyncAwait<Filter<Schema>>
    afterFind(): AsyncAwait<void>
    beforeSave(): AsyncAwait<boolean>
    afterSave(): AsyncAwait<void>
}