import MigrationsFilter from "@foundations/decorators/MigrationsFilter"


export default class OnlyNewMigrations extends MigrationsFilter
{
    public async filterMigrations(migration: string): Promise<string | false>
    {
        return await this.checkMigration(migration) ? false : migration
    }
}