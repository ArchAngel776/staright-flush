import { SessionData } from "express-session"
import { FileArray } from "express-fileupload"

import { Request } from "@data/types/Request"
import ResponseInterface from "@data/interfaces/ResponseInterface"
import { AsyncAwait } from "@data/types/AsyncAwait"


export default abstract class Action<RequestBody, ResponseBody>
{
    protected readonly request: Request<RequestBody, ResponseBody>

    public constructor(request: Request<RequestBody, ResponseBody>)
    {
        this.request = request
    }

    public abstract make(response: ResponseInterface<ResponseBody>): AsyncAwait<ResponseInterface<ResponseBody>>

    protected get data(): RequestBody
    {
        return this.request.body
    }

    protected get session(): Partial<SessionData>
    {
        return this.request.session
    }

    protected get files(): FileArray
    {
        return this.request.files || {}
    }
}