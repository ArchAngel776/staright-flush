import { RequestHandler } from "express"

import { MiddlewareConstructor } from "@data/types/MiddlewareConstructor"

import Response from "@components/builders/Response"


export default function middleware<RequestData, ResponseData>(Middleware: MiddlewareConstructor<RequestData, ResponseData>): RequestHandler
{
    return async(request, response, next) => {
        const middleware = new Middleware(request, new Response<ResponseData>(response))
        await middleware.make() ? next() : middleware.getResponse().send()
    }
}