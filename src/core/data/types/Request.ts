import * as express from "express"
import { ParamsDictionary } from "express-serve-static-core"


export type Request<RequestData = object, ResponseBody = string> = express.Request<ParamsDictionary, ResponseBody, RequestData>