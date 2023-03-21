import { MimeType } from "@data/enums/MimeType"
import ResponseInterface from "@data/interfaces/ResponseInterface"
import { AsyncAwait } from "@data/types/AsyncAwait"
import { Constructor } from "@data/types/Constructor"

import MethodModel from "@foundations/MethodModel"

import Action from "@core/Action"


export type CT<Request, Response> = Constructor<ContentType<Request, Response>>

export default class ContentType<RequestBody, ResponseBody> extends MethodModel<Action<RequestBody, ResponseBody>, AsyncAwait<ResponseInterface<ResponseBody>>, [response: ResponseInterface<ResponseBody>]>
{
    protected mimeType: MimeType

    public constructor(target: Action<RequestBody, ResponseBody>, mimeType: MimeType)
    {
        super(target)
        this.mimeType = mimeType
    }

    public method(this: Action<RequestBody, ResponseBody>, { contentType, original }: ContentType<RequestBody, ResponseBody>, response: ResponseInterface<ResponseBody>): AsyncAwait<ResponseInterface<ResponseBody>>
    {
        return original(response.header("content-type", contentType))
    }

    public get contentType(): MimeType
    {
        return this.mimeType
    }
}