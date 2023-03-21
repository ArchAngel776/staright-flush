import * as express from "express"

import { HttpStatus } from "@data/enums/HttpStatus"
import ResponseHeaders from "@data/interfaces/ResponseHeaders"
import ResponseInterface from "@data/interfaces/ResponseInterface"
import { ResponseValue } from "@data/types/ResponseValue"

import responseMessage from "@hooks/responseMessage"


export default class Response<ResponseBody> implements ResponseInterface<ResponseBody>
{
    protected core: express.Response<ResponseBody>

    protected responseStatus: HttpStatus

    protected responseHeaders: ResponseHeaders

    protected responseBody: ResponseBody | undefined

    public constructor(core: express.Response<ResponseBody>)
    {
        this.core = core
        this.responseStatus = HttpStatus.OK
        this.responseHeaders = {}
    }

    public ok(): this
    {
        return this.status(HttpStatus.OK)
    }

    public created(): this
    {
        return this.status(HttpStatus.CREATED)
    }

    public noContent(): this
    {
        return this.status(HttpStatus.NO_CONTENT)
    }

    public moved(): this
    {
        return this.status(HttpStatus.MOVED)
    }

    public found(): this
    {
        return this.status(HttpStatus.FOUND)
    }

    public badRequest(): this
    {
        return this.status(HttpStatus.BAD_REQUEST)
    }

    public unathorized(): this
    {
        return this.status(HttpStatus.UNAUTHORIZED)
    }

    public forbidden(): this
    {
        return this.status(HttpStatus.FORBIDDEN)
    }

    public notFound(): this
    {
        return this.status(HttpStatus.NOT_FOUND)
    }

    public internalError(): this
    {
        return this.status(HttpStatus.INTERNAL_ERROR)
    }

    public notImplemented(): this
    {
        return this.status(HttpStatus.NOT_IMPLEMENTED)
    }

    public serviceUnavailable(): this
    {
        return this.status(HttpStatus.SERVICE_UNAVAILABLE)
    }

    public status(responseStatus: number): this
    {
        this.responseStatus = responseStatus
        return this
    }

    public headers(responseHeaders: ResponseHeaders): this
    {
        for (const header in responseHeaders) {
            this.header(header, responseHeaders[header])
        }
        return this
    }

    public header(header: string, value: ResponseValue): this
    {
        this.responseHeaders[header] = value
        return this
    }

    public with(responseBody: ResponseBody): this
    {
        this.responseBody = responseBody
        return this
    }

    public send(): void
    {
        this.core.statusCode = this.responseStatus
        this.core.statusMessage = responseMessage(this.responseStatus)

        for (const header in this.responseHeaders) {
            this.core.setHeader(header, this.responseHeaders[header])
        }

        this.core.send(this.responseBody)
        this.core.end()
    }
}