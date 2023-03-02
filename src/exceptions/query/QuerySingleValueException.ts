/* eslint-disable @typescript-eslint/no-unused-vars */
import Except from "../../core/decorators/Except"
import Exception from "../../core/Exception"

@Except
export default class QuerySingleValueException extends Exception
{
    public getName(): string
    {
        return "Query Single Value Exception"
    }

    public getMessage(): string
    {
        return "Query value to array comparison must be array but got a signle value"
    }
}