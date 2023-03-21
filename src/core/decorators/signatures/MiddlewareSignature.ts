import { MiddlewareConstructor } from "@decorators/constructors/MiddlewareConstructor"


export default function MiddlewareSignature<RequestData, ResponseData>()
{
    return function <Target extends MiddlewareConstructor<RequestData, ResponseData>>(Target: Target): Target
    {
        return class extends Target
        {
            public async make(): Promise<boolean>
            {
                const result = await super.make()
                result ? await this.onSuccess() : await this.onError()
                return result
            }
        }
    }
}