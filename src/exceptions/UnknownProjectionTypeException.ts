/* eslint-disable @typescript-eslint/no-unused-vars */
import Except from "../core/decorators/Except"
import Exception from "../core/Exception"

@Except
export default class UnknownProjectionTypeException extends Exception
{
    public getName(): string
    {
        return "Unknown Projection Type Exception"
    }
    
    public getMessage(): string
    {
        return "Disallowed array's projection type value"
    }
}