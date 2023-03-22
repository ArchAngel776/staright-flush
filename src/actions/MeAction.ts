import { MeRequestData } from "../../@types/request/MeRequestData"
import { MeResponseData } from "../../@types/response/MeResponseData"

import { MimeType } from "@data/enums/MimeType"
import type ResponseInterface from "@data/interfaces/ResponseInterface"

import Method from "@helpers/Method"
import ContentType, { CT } from "@decorators/actions/ContentType"

import Action from "@core/Action"


export default class MeAction extends Action<MeRequestData, MeResponseData>
{
    @Method(<CT<MeRequestData, MeResponseData>> ContentType, MimeType.JSON)
    public make(response: ResponseInterface<MeResponseData>): ResponseInterface<MeResponseData>
    {
        const user = this.auth.getUser()
        return user ?
            response.with({ success: true, user }) :
            response.internalError().with({ success: false, message: "Nie udało się pobrać informacji o użytkowniku" })
    }
}