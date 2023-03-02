/* eslint-disable @typescript-eslint/no-explicit-any */
import { FunctionArguments } from "./FunctionArguments"

export type Constructor<Type = any, Params extends FunctionArguments = any> = new (...args: Params) => Type 