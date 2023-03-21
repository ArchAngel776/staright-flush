import { Constructor } from "@data/types/Constructor"
import { Request } from "@data/types/Request"
import ResponseInterface from "@data/interfaces/ResponseInterface"

import Middleware from "@core/Middleware"


export type MiddlewareConstructor<RequestData, ResponseData> = Constructor<Middleware<RequestData, ResponseData>, [request: Request<RequestData, ResponseData>, response: ResponseInterface<ResponseData>]>