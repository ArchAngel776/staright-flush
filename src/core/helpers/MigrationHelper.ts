import { ClientSession, Db, Filter, ObjectId } from "mongodb"

import MigrationSchema from "@data/interfaces/MigrationSchema"
import { MigrationConstructor } from "@data/types/MigrationConstructor"

import Connection from "@components/database/Connection"


export default class MigrationHelper
{
    public static MIGRATIONS_COLLECTION = "migrations"

    protected db: Db

    protected session: ClientSession

    protected readonly connection: Connection

    public constructor(db: Db, session: ClientSession)
    {
        this.db = db
        this.session = session
        this.connection = Connection.getConnection()
    }

    public async apply(Migration: MigrationConstructor): Promise<boolean>
    {
        await this.db.collection(MigrationHelper.MIGRATIONS_COLLECTION).insertOne(this.newMigrationData(Migration), { session: this.session })
        return new Migration(this.db, this.session).apply()
    }

    public async revert(Migration: MigrationConstructor): Promise<boolean>
    {
        await this.db.collection(MigrationHelper.MIGRATIONS_COLLECTION).deleteOne(this.existsMigrationData(Migration), { session: this.session })
        return new Migration(this.db, this.session).revert()
    }

    protected newMigrationData(Migration: MigrationConstructor): MigrationSchema
    {
        return {
            _id: new ObjectId,
            migration_name: Migration.name,
            created_at: new Date
        }
    }

    protected existsMigrationData(Migration: MigrationConstructor): Filter<MigrationSchema>
    {
        return { migration_name: Migration.name }
    }
}