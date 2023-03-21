/* eslint-disable @typescript-eslint/no-unused-vars */
import Except from "@decorators/Except"

import Exception from "@core/Exception"


@Except
export default class ComparisonNumberTypeException extends Exception
{
    public getName(): string
    {
        return "Comparison Number Type Exception"
    }

    public getMessage(): string
    {
        return "Value to compare must be a number type"
    }
}