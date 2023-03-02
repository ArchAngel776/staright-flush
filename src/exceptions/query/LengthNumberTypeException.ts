/* eslint-disable @typescript-eslint/no-unused-vars */
import Except from "../../core/decorators/Except"
import Exception from "../../core/Exception"

@Except
export default class LengthNumberTypeException extends Exception
{
    public getName(): string
    {
        return "Length Number Type Exception"
    }
    
    public getMessage(): string
    {
        return "Length of searched array must be a number"
    }
}