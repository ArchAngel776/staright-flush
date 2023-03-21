import { String } from "@data/enums/String"

import Exception from "@core/Exception"


export default abstract class MigrationExecutorException extends Exception
{
    protected migrationName: string

    public constructor(migrationName: string | undefined)
    {
        super()
        this.migrationName = migrationName || String.EMPTY
    }
}