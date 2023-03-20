import { HttpHeaders } from "../data/types/HttpHeaders"
import Api, { ApiEventListener, ApiEventType } from "./Api"

export default class HttpErrors
{
    protected status: number

    protected headers: HttpHeaders

    public constructor(status: number, headers: HttpHeaders)
    {
        this.status = status
        this.headers = headers
    }

    public selectEvent<Request, Response>(api: Api<Request, Response>): Array<ApiEventListener<Request, Response>[ApiEventType]>
    {
        const { validateError, error } = api.eventListeners
        return this.isValidateError ? validateError : error
    }

    protected get isValidateError(): boolean
    {
        return this.status === 400 && this.headers["sf-validation"] === "error"
    }
}