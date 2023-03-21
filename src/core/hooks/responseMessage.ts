import { HttpMessage } from "@data/enums/HttpMessage"
import { HttpStatus } from "@data/enums/HttpStatus"

import UnknownHttpCodeException from "@exceptions/UnknownHttpCodeException"


export default function responseMessage(code: HttpStatus): HttpMessage
{
    switch (code)
    {
        case HttpStatus.OK:
            return HttpMessage.OK
        case HttpStatus.CREATED:
            return HttpMessage.CREATED
        case HttpStatus.NO_CONTENT:
            return HttpMessage.NO_CONTENT
        case HttpStatus.MOVED:
            return HttpMessage.MOVED
        case HttpStatus.FOUND:
            return HttpMessage.FOUND
        case HttpStatus.BAD_REQUEST:
            return HttpMessage.BAD_REQUEST
        case HttpStatus.UNAUTHORIZED:
            return HttpMessage.UNAUTHORIZED
        case HttpStatus.FORBIDDEN:
            return HttpMessage.FORBIDDEN
        case HttpStatus.NOT_FOUND:
            return HttpMessage.NOT_FOUND
        case HttpStatus.INTERNAL_ERROR:
            return HttpMessage.INTERNAL_ERROR
        case HttpStatus.NOT_IMPLEMENTED:
            return HttpMessage.NOT_IMPLEMENTED
        case HttpStatus.SERVICE_UNAVAILABLE:
            return HttpMessage.SERVICE_UNAVAILABLE
        default:
            throw new UnknownHttpCodeException(code)
    }
}