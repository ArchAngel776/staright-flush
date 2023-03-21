import type { Request } from "@data/types/Request"
import type ResponseInterface from "@data/interfaces/ResponseInterface"

import MiddlewareSignature from "@decorators/signatures/MiddlewareSignature"

import Middleware from "@core/Middleware"


@MiddlewareSignature()
export default class Guest extends Middleware
{
    protected redirect: string | undefined

    public constructor(request: Request, response: ResponseInterface<string>, redirect?: string)
    {
        super(request, response)
        this.redirect = redirect
    }

    public make(): boolean
    {
        return !this.auth.isLogged()
    }

    public onError(): void
    {
        this.redirect ?
            this.response.moved().header("location", this.redirect) :
            this.response.forbidden().with("Guest access only")
    }
}