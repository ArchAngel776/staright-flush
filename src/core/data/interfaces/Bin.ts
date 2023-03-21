/* eslint-disable @typescript-eslint/no-explicit-any */
import { FunctionArguments } from "@data/types/FunctionArguments"


export default interface Bin<Type = any, Arguments extends FunctionArguments = any> 
{
    (...args: Arguments): Type
}