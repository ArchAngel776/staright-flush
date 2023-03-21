import { Filter } from "mongodb"

import ModelSchema from "@data/interfaces/ModelSchema"
import { ProjectionData } from "@data/types/ProjectionData"


export type BeforeFindData<Schema extends ModelSchema> = [ filter: Filter<Schema>, projection?: ProjectionData<Schema> ]