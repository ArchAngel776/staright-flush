import CsrfRequest from "@data/interfaces/CsrfRequest"

import MiddlewareSignature from "@decorators/signatures/MiddlewareSignature"

import Middleware from "@core/Middleware"


declare module "express-session"
{
    interface SessionData
    {
        csrfToken: string
    }
}

@MiddlewareSignature<CsrfRequest, string>()
export default class CsrfValidation extends Middleware<CsrfRequest, string>
{
    public make(): boolean
    {
        if (!this.session.csrfToken) {
            return false
        }

        const { _csrf_token } = this.data
        return _csrf_token === this.session.csrfToken
    }

    public onError(): void
    {
        this.response.badRequest().with("CSRF validation failed")
    }
}