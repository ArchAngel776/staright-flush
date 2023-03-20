import { RegisterResponseData } from "../../../../@types/response/RegisterResponseData"
import { HttpHeaders } from "../types/HttpHeaders"

export default interface HttpErrorCallback
{
    (data: RegisterResponseData | string, status: number, headers: HttpHeaders): void
}