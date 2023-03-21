/* eslint-disable @typescript-eslint/no-unused-vars */
import Except from "@decorators/Except"

import Exception from "@core/Exception"


@Except
export default class OriginalMethodNotImplementedException extends Exception
{
    public getName(): string
    {
        return "Original Method Not Implemented Exception"
    }

    public getMessage(): string
    {
        throw "Decorator model does not implement original method from target class"
    }
}