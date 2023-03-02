import Bin from "../data/interfaces/Bin"
import { FunctionArguments } from "../data/types/FunctionArguments"
import { MethodModelContructor } from "../data/types/MethodModelContructor"
import MethodsBinder from "./MethodsBinder"
import MethodsExtractor from "./MethodsExtractor"

export default function Method<Target, Result, Arguments extends FunctionArguments, Params extends FunctionArguments>(MethodModel: MethodModelContructor<Target, Result, Arguments, Params>, ...args: Params)
{
    return function (target: Target, property: string, descriptor: PropertyDescriptor): void
    {
        const originalMethod: Bin<Result, Arguments> = descriptor.value
        descriptor.value = function(this: Target, ...methodArgs: Arguments): Result
        {
            const methodModel = new MethodModel(this, ...args)
            const binded = new MethodsBinder(methodModel).bindMethods(new MethodsExtractor(methodModel).extract().filter(method => !["method", "originalMethod"].includes(method)))
            return methodModel.withOriginalMethod(originalMethod).method.call(this, binded, ...methodArgs)
        }
    }
}