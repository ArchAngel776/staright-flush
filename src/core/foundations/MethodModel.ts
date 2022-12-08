import OriginalMethodNotImplementedException from "../../exceptions/OriginalMethodNotImplementedException"
import Bin from "../data/interfaces/Bin"

export default abstract class MethodModel<Target, Result = void, Arguments extends Array<unknown> = []>
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

    protected original(...args: Arguments): Result
    {
        if (!this.originalMethod) {
            throw new OriginalMethodNotImplementedException
        }
        return this.originalMethod.call(this.target, ...args)
    }

    public abstract method(...args: Arguments): Result
}