export default class HttpMethodException extends Error
{
    protected httpType: string

    public constructor(httpType: string)
    {
        super()
        this.httpType = httpType
    }

    public get name(): string
    {
        return "HTTP method exception"
    }

    public get message(): string
    {
        return `Type ${this.httpType} is incorrect HTTP type.`
    }
}