/* eslint-disable @typescript-eslint/no-unused-vars */
import Except from "../../core/decorators/Except"
import Exception from "../../core/Exception"

@Except
export default class LengthNanNumberException extends Exception
{
    public getName(): string
    {
        return "Length NaN Number Exception"
    }
    
    public getMessage(): string
    {
        return "Length of searched array cannot be NaN"
    }
}