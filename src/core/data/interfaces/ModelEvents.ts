import { Filter } from "mongodb"
import { AsyncAwait } from "../types/AsyncAwait"
import { BeforeFindData } from "../types/BeforeFindData"
import { ProjectionData } from "../types/ProjectionData"
import ModelSchema from "./ModelSchema"

export default interface ModelEvents<Schema extends ModelSchema>
{
    beforeFind(filter: Filter<Schema>, projection?: ProjectionData<Schema>): AsyncAwait<BeforeFindData<Schema>>
    afterFind(): AsyncAwait<void>
    beforeSave(): AsyncAwait<boolean>
    afterSave(): AsyncAwait<void>
    beforeDelete(): AsyncAwait<boolean>
    afterDelete(): AsyncAwait<void>
}