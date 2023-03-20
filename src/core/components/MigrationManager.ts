import { ClientSession, Db } from "mongodb"

import DatabaseSessionOperation from "@data/callbacks/DatabaseSessionOperation"
import { MigrationConstructor } from "@data/types/MigrationConstructor"

import Connection from "@components/database/Connection"
import MigrationHelper from "@helpers/MigrationHelper"

import print from "@hooks/print"
import getError from "@hooks/getError"


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