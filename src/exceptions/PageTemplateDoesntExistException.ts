import Except from "@decorators/Except";

import Exception from "@core/Exception"


@Except
export default class PageTemplateDoesntExistException extends Exception
{
    protected path: string

    public constructor(path: string)
    {
        super()
        this.path = path
    }

    public getName(): string
    {
        return "Page Template Doesn't Exist Exception"
    }

    public getMessage(): string
    {
        return `Template page doesn't exist under specified path: ${this.path}`
    }
}