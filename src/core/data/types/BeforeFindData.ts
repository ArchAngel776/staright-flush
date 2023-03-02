import { Filter } from "mongodb"
import ModelSchema from "../interfaces/ModelSchema"
import { ProjectionData } from "./ProjectionData"

export type BeforeFindData<Schema extends ModelSchema> = [ Filter<Schema>, ProjectionData<Schema> | undefined ]