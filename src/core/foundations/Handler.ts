import { SessionData } from "express-session"

import { Request } from "@data/types/Request"
import AuthInterface from "@data/interfaces/AuthInterface"

import AuthManager from "@components/AuthManager"


export default class Handler<RequestData, ResponseData>
{
    protected readonly request: Request<RequestData, ResponseData>

    public constructor(request: Request<RequestData, ResponseData>)
    {
        this.request = request
    }

    protected get data(): RequestData
    {
        return this.request.body
    }

    protected get session(): Partial<SessionData>
    {
        return this.request.session
    }

    protected get auth(): AuthInterface
    {
        return AuthManager.open(this.session)
    }
}