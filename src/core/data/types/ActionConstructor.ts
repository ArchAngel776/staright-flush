import { Request } from "express"
import { ParamsDictionary } from "express-serve-static-core"

import { Constructor } from "@data/types/Constructor"

import Action from "@core/Action"


export type ActionConstructor<RequestBody, ResponseBody> = Constructor<Action<RequestBody, ResponseBody>, [request: Request<ParamsDictionary, ResponseBody, RequestBody>]>