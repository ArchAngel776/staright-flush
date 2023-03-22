import { Constructor } from "@data/types/Constructor"
import { Request } from "@data/types/Request"
import ResponseInterface from "@data/interfaces/ResponseInterface"
import { FunctionArguments } from "@data/types/FunctionArguments"

import Middleware from "@core/Middleware"


export type MiddlewareConstructor<RequestData = object, ResponseData = string, Args extends FunctionArguments = []> = Constructor<Middleware<RequestData, ResponseData>, [request: Request<RequestData, ResponseData>, response: ResponseInterface<ResponseData>, ...params: Args]>