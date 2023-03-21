import Exception from "@core/Exception"

import Except from "@decorators/Except"


@Except
export default class InvalidRatioValueException extends Exception
{
    protected ratio: string

    public constructor(ratio: string)
    {
        super()
        this.ratio = ratio
    }

    public getName(): string
    {
        return "Invalid Ratio Value Exception"
    }

    public getMessage(): string
    {
        return `Ratio like ${this.ratio} is not handled ratio type`
    }
}