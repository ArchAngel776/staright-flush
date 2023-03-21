import { Request } from "@data/types/Request"
import ResponseInterface from "@data/interfaces/ResponseInterface"
import { AsyncAwait } from "@data/types/AsyncAwait"

import Handler from "@foundations/Handler"


export default abstract class Middleware<RequestData = object, ResponseData = string> extends Handler<RequestData, ResponseData>
{
    protected readonly response: ResponseInterface<ResponseData>

    public constructor(request: Request<RequestData, ResponseData>, response: ResponseInterface<ResponseData>)
    {
        super(request)
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
}