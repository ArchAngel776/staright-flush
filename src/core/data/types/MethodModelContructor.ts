import MethodModel from "../../foundations/MethodModel"
import { FunctionArguments } from "./FunctionArguments"

export type MethodModelContructor<Target, Result, Arguments extends FunctionArguments, Params extends FunctionArguments> = new (target: Target, ...args: Params) => MethodModel<Target, Result, Arguments>