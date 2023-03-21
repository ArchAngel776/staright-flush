import { AsyncAwait } from "../types/AsyncAwait"
import { HttpHeaders } from "../types/HttpHeaders"

export default interface HttpResponseCallback<Response>
{
    (response: Response, status: number, headers: HttpHeaders): AsyncAwait
}