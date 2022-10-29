/* eslint-disable @typescript-eslint/no-unused-vars */
import Except from "../core/decorators/Except";
import Exception from "../core/Exception"

@Except
export default class EmptyMigrationException extends Exception
{
    public getName(): string
    {
        return "Empty Migration Exception"
    }
    
    public getMessage(): string
    {
        return "Cannot get current migration"
    }
}