import MethodModel from "@foundations/MethodModel"

import SiteAction from "@actions/SiteAction"

declare module "express-session"
{
    interface SessionData
    {
        csrfToken: string
    }
}

export default class CsrfBind extends MethodModel<SiteAction, string>
{
    public method(this: SiteAction, { original }: CsrfBind): string
    {
        const csrfToken = original()
        this.request.session.csrfToken = csrfToken
        return csrfToken
    }
}