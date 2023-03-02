/* eslint-disable @typescript-eslint/no-unused-vars */
import Except from "../core/decorators/Except"
import Exception from "../core/Exception"

@Except
export default class QueryTypeValueException extends Exception
{
    public getName(): string
    {
        return "Query Type Value Exception"
    }

    public getMessage(): string
    {
        return "Query type must be a number (if is type value) or string (if is alias of type)"
    }
}