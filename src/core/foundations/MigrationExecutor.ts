import { MigrationConstructor } from "@data/types/MigrationConstructor"
import { Nullable } from "@data/types/Nullable"

import MigrationCommand from "@foundations/MigrationCommand"
import MigrationManager from "@components/MigrationManager"

import EmptyMigrationException from "@exceptions/EmptyMigrationException"


export default abstract class MigrationExecutor extends MigrationCommand
{
    protected migrationManager: MigrationManager

    protected migrations: Array<string>

    protected currentMigration: Nullable<MigrationConstructor>

    public constructor()
    {
        super()
        this.migrationManager = new MigrationManager
        this.migrations = []
        this.currentMigration = null
    }

    public check(): boolean
    {
        if (!super.check()) {
            return false
        }

        const migrations = this.migrationDir.list()
        if (!migrations) {
            return false
        }

        this.migrations = migrations.filter(migration => this.migrationPattern.test(migration))
        return true
    }

    protected get migrationPattern(): RegExp
    {
        return new RegExp(`^${MigrationExecutor.MIGRATION_PREFIX}_(.+)\\.js$`)
    }

    public get migrationsList(): Array<string>
    {
        return this.migrations
    }

    public get current(): MigrationConstructor
    {
        if (!this.currentMigration) {
            throw new EmptyMigrationException
        }
        return this.currentMigration
    }

    public set current(migration: MigrationConstructor)
    {
        this.currentMigration = migration
    }
}