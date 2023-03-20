import Exception from "@core/Exception"


export default class UnknownHttpCodeException extends Exception
{
    protected code: number

    public constructor(code: number)
    {
        super()
        this.code = code
    }

    public getName(): string
    {
        return "Unknown HTTP Code Exception"
    }

    public getMessage(): string
    {
        return `Code ${this.code} was not recognized as a valid HTTP code.`
    }
}