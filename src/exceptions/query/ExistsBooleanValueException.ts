/* eslint-disable @typescript-eslint/no-unused-vars */
import Except from "@decorators/Except"

import Exception from "@core/Exception"


@Except
export default class ExistsBooleanValueException extends Exception
{
    public getName(): string
    {
        return "Exists Boolean Value Exception"
    }

    public getMessage(): string
    {
        return "Existance value can be only boolean type"
    }
}