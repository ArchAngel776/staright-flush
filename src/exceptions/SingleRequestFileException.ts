import Exception from "@core/Exception"

import Except from "@decorators/Except"


@Except
export default class SingleRequestFileException extends Exception
{
    public getName(): string
    {
        return "Single Request File Exception"
    }

    public getMessage(): string
    {
        return "This request allows only single uploaded file."
    }
}