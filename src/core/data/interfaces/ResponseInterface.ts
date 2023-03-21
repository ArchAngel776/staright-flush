import { HttpStatus } from "@data/enums/HttpStatus"
import { ResponseValue } from "@data/types/ResponseValue"
import ResponseHeaders from "@data/interfaces/ResponseHeaders"


export default interface ResponseInterface<ResponseBody>
{
    status(code: HttpStatus): this
    ok(): this
    created(): this
    noContent(): this
    moved(): this
    found(): this
    badRequest(): this
    unathorized(): this
    forbidden(): this
    notFound(): this
    internalError(): this
    notImplemented(): this
    serviceUnavailable(): this
    headers(responseHeaders: ResponseHeaders): this
    header(header: string, value: ResponseValue): this
    with(body: ResponseBody): this
    send(): void
}