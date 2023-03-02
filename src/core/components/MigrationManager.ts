import { ClientSession, Db } from "mongodb"
import Connection from "./database/Connection"
import DatabaseSessionOperation from "../data/callbacks/DatabaseSessionOperation"
import { MigrationConstructor } from "../data/types/MigrationConstructor"
import print from "../hooks/print"
import getError from "../hooks/getError"
import MigrationHelper from "../helpers/MigrationHelper"

export default class MigrationManager
{
    protected readonly connection: Connection

    public constructor()
    {
        this.connection = Connection.getConnection()
    }

    protected async execute(operation: DatabaseSessionOperation<boolean>): Promise<boolean>
    {
        const transaction = await this.connection.beginTransaction()
        try {
            const result = await transaction.make(operation)
            await transaction.commit()
            return result
        }
        catch (exception) {
            print(getError(exception))
            await transaction.rollback()
            return false
        }
    }

    public executeApplying(Migration: MigrationConstructor): Promise<boolean>
    {
        return this.execute((database: Db, session: ClientSession) => new MigrationHelper(database, session).apply(Migration))
    }

    public executeReverting(Migration: MigrationConstructor): Promise<boolean>
    {
        return this.execute((database: Db, session: ClientSession) => new MigrationHelper(database, session).revert(Migration))
    }
}