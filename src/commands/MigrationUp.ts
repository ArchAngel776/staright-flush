/* eslint-disable @typescript-eslint/no-unused-vars */
import { Console } from "../core/data/enums/Console"
import MigrationFilesPrint from "../core/decorators/MigrationFilesPrint"
import OnlyNewMigrations from "../core/decorators/OnlyNewMigrations"
import MigrationExecutor from "../core/foundations/MigrationExecutor"
import Method from "../core/helpers/Method"
import print from "../core/hooks/print"
import MigrationApplyingException from "../exceptions/MigrationApplyingException"

export default class MigrationUp extends MigrationExecutor
{
    /**
     * Custom statuses
     */
    public static MIGRATION_APPLYING_ERROR = -2

    @Method(OnlyNewMigrations)
    @Method(MigrationFilesPrint, "Below files will be applied:", "No migrations to applying.")
    public async execute(): Promise<number>
    {
        for (const migration of this.migrations) {
            const importMigration = await import(`${this.path}/${migration}`)
            this.current = importMigration.default

            if (!await this.migrationManager.executeApplying(this.current)) {
                return MigrationUp.MIGRATION_APPLYING_ERROR
            }

            print(`Successful applied migration: ${migration}`, Console.GREEN)
        }

        return MigrationUp.SUCCESS
    }

    public except(status: number): void
    {
        switch (status) {
            case MigrationUp.MIGRATION_APPLYING_ERROR:
                throw new MigrationApplyingException(this.current.name)
            default:
                return super.except(status)
        }
    }
}