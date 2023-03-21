import * as express from "express"
import { ParamsDictionary } from "express-serve-static-core"


export type Request<RequestData, ResponseBody> = express.Request<ParamsDictionary, ResponseBody, RequestData>