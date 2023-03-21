import { RequestHandler } from "express"

import { ModelErrorsData } from "@data/types/ModelErrorsData"
import { RequestConstructor } from "@data/types/RequestContructor"

import Response from "@components/builders/Response"


export default function validate<RequestData>(Request: RequestConstructor<RequestData>): RequestHandler
{
    return async ({ body, files }, response, next) => new Request(body, files || {}).validateRequest(new Response<ModelErrorsData<RequestData>>(response)).then(response => response ? response.send() : next())
}