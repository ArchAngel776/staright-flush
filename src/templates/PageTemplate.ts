import { readFileSync } from "fs"

import Method from "@helpers/Method"
import ExistingTemplate from "@decorators/ExistingTemplate"

import Template from "@core/Template"


export default class PageTemplate extends Template
{
    protected path: string

    public constructor(path: string)
    {
        super()
        this.path = path
    }

    @Method(ExistingTemplate)
    public content(): string
    {
        return readFileSync(this.path, "utf-8")
    }
}