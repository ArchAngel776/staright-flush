/* eslint-disable @typescript-eslint/no-unused-vars */
import Except from "@decorators/Except"

import Exception from "@core/Exception"


@Except
export default class UnknownOperatorException extends Exception
{
    protected operator: number | string

    public constructor(operator: number | string)
    {
        super()
        this.operator = operator
    }

    public getName(): string
    {
        return "Unknown Operator Exception"
    }

    public getMessage(): string
    {
        return `Operator "${this.operator}" is not property value comparision operator signature.`
    }
}