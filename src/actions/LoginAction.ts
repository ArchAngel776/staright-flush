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
    public async make(response: ResponseInterface<LoginResponseData>): Promise<ResponseInterface<LoginResponseData>>
    {
        const { username, password, remember } = this.data

        if (await this.auth.login(username, password)) {
            if (remember) {
                this.auth.remember()
            }
            
            return response.with({ success: true })
        }

        return response.unathorized().with({ success: false, message: "Błędny login lub hasło" })
    }
}