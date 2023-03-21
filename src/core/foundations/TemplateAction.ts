import { Request } from "express"

import TempalteParams from "@data/interfaces/TemplateParams"
import { MimeType } from "@data/enums/MimeType"
import type ResponseInterface from "@data/interfaces/ResponseInterface"

import Method from "@helpers/Method"
import ContentType, { CT } from "@decorators/actions/ContentType"

import Action from "@core/Action"
import PageTemplate from "@templates/PageTemplate"


export default abstract class TemplateAction extends Action<object, string>
{
    protected page: PageTemplate

    public constructor(request: Request)
    {
        super(request)
        this.page = new PageTemplate(this.template())
    }

    @Method(<CT<object, string>> ContentType, MimeType.HTML)
    public make(response: ResponseInterface<string>): ResponseInterface<string>
    {
        const page = this.page.withParams(this.params()).make()
        return response.with(page)
    }

    public abstract template(): string

    public abstract params(): TempalteParams
}