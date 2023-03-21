import { Constructor } from "@data/types/Constructor"
import { AsyncAwait } from "@data/types/AsyncAwait"

import Middleware from "@core/Middleware"


export type MiddlewareConstructor<RequestData, ResponseData> = Constructor<Middleware<RequestData, ResponseData> & {
    make(): AsyncAwait<boolean>
}>