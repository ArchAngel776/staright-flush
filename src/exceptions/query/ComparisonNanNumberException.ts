/* eslint-disable @typescript-eslint/no-unused-vars */
import Except from "@decorators/Except"

import Exception from "@core/Exception"


@Except
export default class ComparisonNanNumberException extends Exception
{
    public getName(): string
    {
        return "Comparison NaN Number Exception"
    }

    public getMessage(): string
    {
        return "Comparised value cannot be NaN"
    }
}