import { existsSync } from "fs"

import MethodModel from "@foundations/MethodModel"

import except from "@hooks/except"

import PageTemplate from "@templates/PageTemplate"
import PageTemplateDoesntExistException from "@exceptions/PageTemplateDoesntExistException"


export default class ExistingTemplate extends MethodModel<PageTemplate, string>
{
    public method(this: PageTemplate, { original }: ExistingTemplate): string
    {
        return existsSync(this.path) ? original() : except(new PageTemplateDoesntExistException(this.path))
    }
}