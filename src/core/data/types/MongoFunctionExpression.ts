import { WithId } from "mongodb"
import ModelSchema from "../interfaces/ModelSchema"

export type MongoFunctionExpression<Schema extends ModelSchema> = (this: WithId<Schema>) => boolean