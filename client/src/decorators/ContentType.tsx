import { MimeType } from "../data/enums/MimeType"
import Api from "../helpers/Api"

export interface TargetFunction<Request>
{
    (request: Request): this
}

export default function ContentType(contentType: MimeType)
{
    return function<Request, Response>(target: Api<Request, Response>, property: string, descriptor: TypedPropertyDescriptor<(request: Request) => Api<Request, Response>>): void
    {
        const original = descriptor.value

        if (!original) {
            return
        }

        descriptor.value = function (this: Api<Request, Response>, request: Request): Api<Request, Response>
        {
            return original.call(this, request).setHeader("content-type", contentType)
        }
    }
}