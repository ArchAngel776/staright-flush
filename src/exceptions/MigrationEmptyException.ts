/* eslint-disable @typescript-eslint/no-unused-vars */
import Except from "@decorators/Except"

import Exception from "@core/Exception"


@Except
export default class MigrationEmptyException extends Exception
{
    public getName(): string 
    {
        return "Migration Empty Exception"
    }

    public getMessage(): string 
    {
        return "Cannot load migration files"
    }
}