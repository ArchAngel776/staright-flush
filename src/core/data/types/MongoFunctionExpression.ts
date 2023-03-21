import { WithId } from "mongodb"

import ModelSchema from "@data/interfaces/ModelSchema"


export type MongoFunctionExpression<Schema extends ModelSchema> = (this: WithId<Schema>) => boolean