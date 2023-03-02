import { Console } from "../data/enums/Console"
import { AsyncAwait } from "../data/types/AsyncAwait"
import MethodModel from "../foundations/MethodModel"
import MigrationExecutor from "../foundations/MigrationExecutor"
import print from "../hooks/print"

export default class MigrationFilesPrint extends MethodModel<MigrationExecutor, AsyncAwait<number>>
{
    protected titleOnMigrations: string

    protected titleWithoutMigrations: string

    public constructor(target: MigrationExecutor, titleOnMigrations: string, titleWithoutMigrations: string)
    {
        super(target)
        this.titleOnMigrations = titleOnMigrations
        this.titleWithoutMigrations = titleWithoutMigrations
    }

    public method(this: MigrationExecutor, { original, printOnMigrations, printWithoutMigrations }: MigrationFilesPrint): AsyncAwait<number>
    {
        this.migrationsList.length ? printOnMigrations(this.migrationsList) : printWithoutMigrations()
        return original()
    }

    protected printOnMigrations(migrations: Array<string>): void
    {
        print(this.titleOnMigrations)
        migrations.forEach(migraion => print(migraion, Console.YELLOW))
        print()
    }

    protected printWithoutMigrations(): void
    {
        print(this.titleWithoutMigrations)
    }
}