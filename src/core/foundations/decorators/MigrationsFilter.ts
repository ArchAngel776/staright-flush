import { parse } from "path"
import Connection from "../../components/database/Connection"
import DatabaseOperation from "../../data/callbacks/DatabaseOperation"
import OnlyNewMigrations from "../../decorators/OnlyNewMigrations"
import MigrationHelper from "../../helpers/MigrationHelper"
import MethodModel from "../MethodModel"
import MigrationExecutor from "../MigrationExecutor"

export default abstract class MigrationsFilter extends MethodModel<MigrationExecutor, Promise<number>>
{
    protected connection: Connection

    public constructor(target: MigrationExecutor)
    {
        super(target)
        this.connection = Connection.getConnection()
    }

    public async method(this: MigrationExecutor, { original, filterMigrations }: OnlyNewMigrations): Promise<number>
    {
        const migrations = await Promise.all(this.migrations.map(filterMigrations))
        this.migrations = <Array<string>> migrations.filter(migration => migration)
        return original()
    }

    public abstract filterMigrations(migration: string): Promise<string|false>

    protected checkMigration(migration: string): Promise<number>
    {
        const migration_name = parse(migration).name
        return this.connection.make(this.migrationChecker(migration_name))
    }

    protected migrationChecker(migration_name: string): DatabaseOperation<number>
    {
        return db => db.collection(MigrationHelper.MIGRATIONS_COLLECTION).countDocuments({ migration_name })
    }
}