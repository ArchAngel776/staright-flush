import { AxiosRequestConfig } from "axios"
import { HttpType } from "../data/enums/HttpType"
import Api from "../helpers/Api"

export default function GetParams<Request, Response>(target: Api<Request, Response>, property: string, descriptor: TypedPropertyDescriptor<AxiosRequestConfig<Request>>): void
{
    const original = descriptor.get

    if (!original) {
        return
    }

    descriptor.get = function (this: Api<Request, Response>): AxiosRequestConfig<Request>
    {
        const options = original.call(this)
        if (this.type === HttpType.GET) {
            options.params = this.request
        }
        return options
    }
}