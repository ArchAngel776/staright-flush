import { SessionData } from "express-session"

import { Request } from "@data/types/Request"
import ResponseInterface from "@data/interfaces/ResponseInterface"
import { AsyncAwait } from "@data/types/AsyncAwait"


export default abstract class Middleware<RequestData, ResponseData>
{
    protected readonly request: Request<RequestData, ResponseData>

    protected readonly response: ResponseInterface<ResponseData>

    public constructor(request: Request<RequestData, ResponseData>, response: ResponseInterface<ResponseData>)
    {
        this.request = request
        this.response = response
    }

    public abstract make(): AsyncAwait<boolean>

    public onSuccess(): AsyncAwait
    {
        return
    }

    public onError(): AsyncAwait
    {
        return
    }

    public getResponse(): ResponseInterface<ResponseData>
    {
        return this.response
    }

    protected get data(): RequestData
    {
        return this.request.body
    }

    protected get session(): Partial<SessionData>
    {
        return this.request.session
    }
}