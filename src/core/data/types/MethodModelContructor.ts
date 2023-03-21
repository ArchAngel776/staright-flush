import { FunctionArguments } from "@data/types/FunctionArguments"

import MethodModel from "@foundations/MethodModel"


export type MethodModelContructor<Target, Result, Arguments extends FunctionArguments, Params extends FunctionArguments> = new (target: Target, ...args: Params) => MethodModel<Target, Result, Arguments>