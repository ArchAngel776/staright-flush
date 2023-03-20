import { Request } from "express"
import { FileArray } from "express-fileupload"
import { ParamsDictionary } from "express-serve-static-core"

import ResponseInterface from "@data/interfaces/ResponseInterface"
import { AsyncAwait } from "@data/types/AsyncAwait"


export default abstract class Action<RequestBody, ResponseBody>
{
    protected readonly request: Request<ParamsDictionary, ResponseBody, RequestBody>

    public constructor(request: Request)
    {
        this.request = request
    }

    public abstract make(response: ResponseInterface<ResponseBody>): AsyncAwait<ResponseInterface<ResponseBody>>

    protected get data(): RequestBody
    {
        return this.request.body
    }

    protected get files(): FileArray
    {
        return this.request.files || {}
    }
}