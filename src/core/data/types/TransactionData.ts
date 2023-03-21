import { ClientSession, Db } from "mongodb"


export type TransactionData = [ database: Db, session: ClientSession ]