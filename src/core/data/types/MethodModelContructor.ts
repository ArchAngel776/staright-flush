import MethodModel from "../../foundations/MethodModel"

export type MethodModelContructor<Target, Result, Arguments extends Array<unknown>, Params extends Array<unknown>> = new (target: Target, ...args: Params) => MethodModel<Target, Result, Arguments>