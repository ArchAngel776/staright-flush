/* eslint-disable @typescript-eslint/no-explicit-any */
import { FunctionArguments } from "@data/types/FunctionArguments"


export type AbstractConstructor<Type = any, Params extends FunctionArguments = any> = abstract new (...args: Params) => Type 