import { RequestHandler } from "express"

import { ActionConstructor } from "@data/types/ActionConstructor"

import Response from "@components/builders/Response"



export default function action<RequestBody, ResponseBody>(Action: ActionConstructor<RequestBody, ResponseBody>): RequestHandler
{
    return async (request, response) => (await new Action(request).make(new Response<ResponseBody>(response))).send()
}