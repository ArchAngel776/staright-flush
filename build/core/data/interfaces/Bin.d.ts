import { Safe } from "../types/Safe";
export default interface Bin<Type = Safe, Arguments = Safe> {
    (...args: Array<Arguments>): Type;
}
