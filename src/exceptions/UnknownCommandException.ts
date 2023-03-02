/* eslint-disable @typescript-eslint/no-unused-vars */
import Except from "../core/decorators/Except"
import Exception from "../core/Exception"

@Except
export default class UnknownCommandException extends Exception
{
    protected command: string

    public constructor(command: string)
    {
        super()
        this.command = command
    }

    public getName(): string 
    {
        return "Unknown Command Exception"
    }

    public getMessage(): string 
    {
        return `Unknown command: "${this.command}"`
    }
}