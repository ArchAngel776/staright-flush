/* eslint-disable @typescript-eslint/no-unused-vars */
import Except from "../core/decorators/Except"
import Exception from "../core/Exception"

@Except
export default class UnknownCommandStatusException extends Exception
{
    protected status: number

    public constructor(status: number)
    {
        super()
        this.status = status
    }

    public getName(): string 
    {
        return "Unknown Command Status Exception"
    }

    public getMessage(): string 
    {
        return `Unknown status: ${this.status}`
    }
}