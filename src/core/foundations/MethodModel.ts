import OriginalMethodNotImplementedException from "../../exceptions/OriginalMethodNotImplementedException"
import { FunctionArguments } from "../data/types/FunctionArguments"
import Bin from "../data/interfaces/Bin"

export default abstract class MethodModel<Target, Result = void, Arguments extends FunctionArguments = []>
{
    protected target: Target

    protected originalMethod: Bin<Result, Arguments> | undefined

    public constructor(target: Target)
    {
        this.target = target
    }

    public withOriginalMethod(originalMethod: Bin<Result, Arguments>): this
    {
        this.originalMethod = originalMethod
        return this
    }

    public original(...args: Arguments): Result
    {
        if (!this.originalMethod) {
            throw new OriginalMethodNotImplementedException
        }
        return this.originalMethod.call(this.target, ...args)
    }

    public abstract method(this: Target, model: MethodModel<Target, Result, Arguments>, ...args: Arguments): Result
}