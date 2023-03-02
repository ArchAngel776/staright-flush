import MigrationsFilter from "../foundations/decorators/MigrationsFilter"

export default class OnlyExistingMigrations extends MigrationsFilter
{
    public async filterMigrations(migration: string): Promise<string | false>
    {
        return await this.checkMigration(migration) ? migration : false
    }
}