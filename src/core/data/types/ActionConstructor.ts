import { Constructor } from "@data/types/Constructor"
import { Request } from "@data/types/Request"

import Action from "@core/Action"


export type ActionConstructor<RequestBody, ResponseBody> = Constructor<Action<RequestBody, ResponseBody>, [request: Request<RequestBody, ResponseBody>]>