/* eslint-disable @typescript-eslint/no-unused-vars */
import { Console } from "@data/enums/Console"

import MigrationExecutor from "@foundations/MigrationExecutor"
import Method from "@helpers/Method"
import OnlyExistingMigrations from "@decorators/OnlyExistingMigrations"
import MigrationFilesPrint from "@decorators/MigrationFilesPrint"

import print from "@hooks/print"

import MigrationRevertingException from "@exceptions/MigrationRevertingError"


export default class MigrationDown extends MigrationExecutor
{
    /**
     * Custom statuses
     */
    public static MIGRATION_REVERTING_ERROR = -2

    @Method(OnlyExistingMigrations)
    @Method(MigrationFilesPrint, "Below files will be reverted:", "No migrations to reverting.")
    public async execute(): Promise<number>
    {
        for (const migration of this.migrations) {
            const importMigration = await import(`${this.path}/${migration}`)
            this.current = importMigration.default

            if (!await this.migrationManager.executeReverting(this.current)) {
                return MigrationDown.MIGRATION_REVERTING_ERROR
            }
            
            print(`Successful reverted migration: ${migration}`, Console.GREEN)
        }

        return MigrationDown.SUCCESS
    }

    public except(status: number): void
    {
        switch (status) {
            case MigrationDown.MIGRATION_REVERTING_ERROR:
                throw new MigrationRevertingException(this.current.name)
            default:
                return super.except(status)
        }
    }
}