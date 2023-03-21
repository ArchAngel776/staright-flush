/* eslint-disable @typescript-eslint/no-unused-vars */
import Except from "@decorators/Except"

import Exception from "@core/Exception"


@Except
export default class CommandErrorException extends Exception
{
    public getName(): string 
    {
        return "Command Error Exception"
    }

    public getMessage(): string 
    {
        return "Error meanwhile executing command"
    }
}