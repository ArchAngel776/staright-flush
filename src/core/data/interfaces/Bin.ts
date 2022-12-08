export default interface Bin<Type = void, Arguments extends Array<unknown> = []> 
{
    (...args: Arguments): Type
}