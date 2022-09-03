import ExceptionBase from "../Exception"

export default abstract class Exception extends ExceptionBase
{
    public getName(): string 
    {
        throw new Error("Method not implemented.");
    }

    public getMessage(): string 
    {
        throw new Error("Method not implemented.");
    }
}