import { ClientSession, Db } from "mongodb"

import Migration from "@core/Migration"


export type MigrationConstructor = new (database: Db, session: ClientSession) => Migration