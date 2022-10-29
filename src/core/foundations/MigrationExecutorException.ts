import { String } from "../data/enums/String"
import Exception from "../Exception"

export default abstract class MigrationExecutorException extends Exception
{
    protected migrationName: string

    public constructor(migrationName: string | undefined)
    {
        super()
        this.migrationName = migrationName || String.EMPTY
    }
}