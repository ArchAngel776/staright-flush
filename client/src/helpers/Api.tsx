import Axios, { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from "axios"
import { HttpType } from "../data/enums/HttpType"
import { Route } from "../data/enums/Route"
import GetParams from "../decorators/GetParams"
import HttpMethodException from "../exception/HttpMethodException"
import HttpResponseCallback from "../data/callbacks/HttpResponseCallback"
import HttpValidateErrorCallback from "../data/callbacks/HttpValidateErrorCallback"
import HttpErrorCallback from "../data/callbacks/HttpErrorCallback"
import HttpErrors from "./HttpErrors"

export type ApiEventType = "response" | "validateError" | "error"

export type ApiEventListener<Request, Response> = {
    response: HttpResponseCallback<Response>
    validateError: HttpValidateErrorCallback<Request>
    error: HttpErrorCallback
}

export type ApiEventListeners<Request, Response> = {
    [Event in ApiEventType]: Array<ApiEventListener<Request, Response>[Event]>
}

export default class Api<Request, Response>
{
    protected type: HttpType

    protected url: Route

    protected headers: RawAxiosRequestHeaders

    protected request: Request | FormData

    protected listeners: ApiEventListeners<Request, Response>

    public constructor(type: HttpType, url: Route)
    {
        this.type = type
        this.url = url
        this.headers = {}
        this.request = {} as Request
        this.listeners = { response: [], validateError: [], error: [] }
    }

    public setHeaders(headers: RawAxiosRequestHeaders): this
    {
        this.headers = headers
        return this
    }

    public setHeader<Key extends keyof RawAxiosRequestHeaders>(header: keyof RawAxiosRequestHeaders, value: RawAxiosRequestHeaders[Key]): this
    {
        this.headers[header] = value
        return this
    }
    
    public json(request: Request): this
    {
        this.request = request
        return this.setHeader("content-type", "application/json")
    }

    public form(request: FormData): this
    {
        this.request = request
        return this.setHeader("content-type", "multipart/form-data")
    }

    public on<ApiEvent extends ApiEventType>(event: ApiEvent, callback: ApiEventListener<Request, Response>[ApiEvent]): this
    {
        switch (event) {
            case "response":
            case "validateError":
            case "error":
                this.listeners[event].push(callback)
            default:
                return this
        }
    }

    public send(): Promise<void>
    {
        return this.sendRequest()
            .then(response => {
                const { data, status, headers } = response
                this.listeners.response.forEach(listener => listener(data, status, headers))
            })
            .catch(error => {
                const { data, status, headers} = error.response
                new HttpErrors(status, headers).selectEvent(this).forEach(listener => listener(data, status, headers))
            })
    }

    protected sendRequest(): Promise<AxiosResponse<Response, Request>>
    {
        switch (this.type) {
            case HttpType.GET:
                return Axios.get<Response, AxiosResponse<Response, Request>, Request | FormData>(this.url, this.options)
            case HttpType.POST:
                return Axios.post<Response, AxiosResponse<Response, Request>, Request | FormData>(this.url, this.request, this.options)
            default:
                throw new HttpMethodException(this.type)
        }
    }

    public get eventListeners(): ApiEventListeners<Request, Response>
    {
        return this.listeners
    }

    @GetParams
    protected get options(): AxiosRequestConfig<Request>
    {
        return { headers: this.headers }
    }

    public static get<Request, Response>(url: Route): Api<Request, Response>
    {
        return new Api(HttpType.GET, url)
    }

    public static post<Request, Response>(url: Route): Api<Request, Response>
    {
        return new Api(HttpType.POST, url)
    }
}