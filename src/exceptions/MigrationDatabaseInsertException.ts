/* eslint-disable @typescript-eslint/no-unused-vars */
import Except from "@decorators/Except"

import Exception from "@core/Exception"


@Except
export default class MigrationDatabaseInsertException extends Exception
{
    public getName(): string 
    {
        return "Migration Database Insert Exception"
    }

    public getMessage(): string 
    {
        return "Error - failed to register migration in database"
    }
}