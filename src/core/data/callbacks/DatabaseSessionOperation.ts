import { ClientSession, Db } from "mongodb"

import { AsyncAwait } from "@data/types/AsyncAwait"


export default interface DatabaseSessionOperation<Type>
{
    (database: Db, session: ClientSession): AsyncAwait<Type>
}