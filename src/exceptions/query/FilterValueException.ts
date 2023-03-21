/* eslint-disable @typescript-eslint/no-unused-vars */
import Except from "@decorators/Except"

import Exception from "@core/Exception"


@Except
export default class FilterValueException extends Exception
{
    public getName(): string
    {
        return "Filter Value Exception"
    }

    public getMessage(): string
    {
        return "Operation requires filter of specified schema as comparison value, but specified value is not an valid object"
    }
}