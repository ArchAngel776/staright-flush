import { RequestHandler } from "express"

import { MiddlewareConstructor } from "@data/types/MiddlewareConstructor"

import Response from "@components/builders/Response"
import { FunctionArguments } from "@core/data/types/FunctionArguments"


export default function middleware<RequestData, ResponseData, Args extends FunctionArguments>(Middleware: MiddlewareConstructor<RequestData, ResponseData, Args>, ...params: Args): RequestHandler
{
    return async(request, response, next) => {
        const middleware = new Middleware(request, new Response<ResponseData>(response), ...params)
        await middleware.make() ? next() : middleware.getResponse().send()
    }
}