import Bin from "../data/interfaces/Bin"
import { AsyncAwait } from "../data/types/AsyncAwait"
import { MethodModelContructor } from "../data/types/MethodModelContructor"

export default function Method<Target, Result, Arguments extends Array<unknown>, Params extends Array<unknown>>(MethodModel: MethodModelContructor<Target, Result, Arguments, Params>, ...args: Params)
{
    return function (target: Target, property: string, descriptor: PropertyDescriptor): void
    {
        const originalMethod: Bin<Result, Arguments> = descriptor.value
        descriptor.value = function(this: Target, ...methodArgs: Arguments): AsyncAwait<Result>
        {
            const methodModel = new MethodModel(this, ...args).withOriginalMethod(originalMethod)
            return methodModel.method.call(methodModel, ...methodArgs)
        }
    }
}