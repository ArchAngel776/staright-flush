import { LoginRequestData } from "../../@types/request/LoginRequestData"
import { LoginResponseData } from "../../@types/response/LoginResponseData"

import { MimeType } from "@data/enums/MimeType"
import type ResponseInterface from "@data/interfaces/ResponseInterface"

import Method from "@helpers/Method"
import ContentType, { CT } from "@decorators/actions/ContentType"

import Action from "@core/Action"


export default class LoginAction extends Action<LoginRequestData, LoginResponseData>
{
    @Method(<CT<LoginRequestData, LoginResponseData>> ContentType, MimeType.JSON)
    public make(response: ResponseInterface<LoginResponseData>): ResponseInterface<LoginResponseData>
    {
        return response
            .with({})
    }
}