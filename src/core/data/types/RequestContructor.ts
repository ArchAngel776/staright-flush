import { FileArray } from "express-fileupload"

import { Constructor } from "@data/types/Constructor"

import RequestWithFiles from "@foundations/RequestWithFiles"

import Request from "@core/Request"


export type RequestConstructor<RequestData> = Constructor<Request<RequestData>, [data: RequestData]> | Constructor<RequestWithFiles<RequestData>, [data: RequestData, files: FileArray]>