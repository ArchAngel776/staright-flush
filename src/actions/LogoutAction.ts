import { LogoutRequestData } from "../../@types/request/LogoutRequestData"
import { LogoutResponseData } from "../../@types/response/LogoutResponseData"

import { MimeType } from "@data/enums/MimeType"
import type ResponseInterface from "@data/interfaces/ResponseInterface"

import Method from "@helpers/Method"
import ContentType, { CT } from "@decorators/actions/ContentType"

import Action from "@core/Action"


export default class LogoutAction extends Action<LogoutRequestData, LogoutResponseData>
{
    @Method(<CT<LogoutRequestData, LogoutResponseData>> ContentType, MimeType.JSON)
    public make(response: ResponseInterface<LogoutResponseData>): ResponseInterface<LogoutResponseData>
    {
        return this.auth.logout() ?
            response.with({ success: true }) :
            response.internalError().with({ success: false, message: "Nie udało się wylogować. Spróbuj ponownie później" })
    }
}