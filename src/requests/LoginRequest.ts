import { LoginRequestData } from "../../@types/request/LoginRequestData"

import { Scenarios } from "@data/interfaces/Scenarios"

import Request from "@core/Request"

import StringValidation from "@validators/core/StringValidation"


export default class LoginRequest extends Request<LoginRequestData>
{
    public validation(): Scenarios<LoginRequestData>
    {
        return {
            username: new StringValidation({ required: true }),
            password: new StringValidation({ required: true }),
            remember: new StringValidation({ pattern: /^on$/ })
        }
    }
}