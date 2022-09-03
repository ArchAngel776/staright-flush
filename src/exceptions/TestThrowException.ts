/* eslint-disable @typescript-eslint/no-unused-vars */
import Except from "../core/decorators/Except"
import Exception from "../core/Exception"

@Except
export default class TestThrowException extends Exception
{
    public getName(): string 
    {
        return "Test Throw Exception"
    }

    public getMessage(): string 
    {
        return "Used \"throw\" parameter in test command."
    }
}