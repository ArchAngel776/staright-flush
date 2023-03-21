import { AsyncAwait } from "../types/AsyncAwait"
import { HttpHeaders } from "../types/HttpHeaders"
import { RequestErrors } from "../types/RequestErrors"

export default interface HttpValidateErrorCallback<Request>
{
    (error: RequestErrors<Request>, status: number, headers: HttpHeaders): AsyncAwait
}