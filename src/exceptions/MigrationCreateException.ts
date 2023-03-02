/* eslint-disable @typescript-eslint/no-unused-vars */
import Except from "../core/decorators/Except"
import Exception from "../core/Exception"

@Except
export default class MigrationCreateException extends Exception
{
    public getName(): string 
    {
        return "Migration Create Exception"
    }

    public getMessage(): string 
    {
        return "Cannot create migration file"
    }
}