import FileLimitRequestData from "../../@types/request/FileLimitRequestData"
import FileLimitResponseData from "../../@types/response/FileLimitResponseData"

import { MimeType } from "@data/enums/MimeType"
import type ResponseInterface from "@data/interfaces/ResponseInterface"

import Method from "@helpers/Method"
import ContentType, { CT } from "@decorators/actions/ContentType"

import Action from "@core/Action"


export default class FileLimitAction extends Action<FileLimitRequestData, FileLimitResponseData> 
{
    @Method(<CT<FileLimitRequestData, FileLimitResponseData>> ContentType, MimeType.JSON)
    public make(response: ResponseInterface<FileLimitResponseData>): ResponseInterface<FileLimitResponseData>
    {
        return response
            .badRequest()
            .with({ success: false, message: "Plik jest zbyt duży" })
    }
}