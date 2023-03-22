import { FileArray } from "express-fileupload"

import ResponseInterface from "@data/interfaces/ResponseInterface"
import { AsyncAwait } from "@data/types/AsyncAwait"

import Handler from "@foundations/Handler"


export default abstract class Action<RequestBody, ResponseBody> extends Handler<RequestBody, ResponseBody>
{
    public abstract make(response: ResponseInterface<ResponseBody>): AsyncAwait<ResponseInterface<ResponseBody>>

    protected has(param: string): boolean
    {
        return param in this.request.params
    }

    protected get(param: string): string
    {
        return this.request.params[param]
    }

    protected get files(): FileArray
    {
        return this.request.files || {}
    }
}