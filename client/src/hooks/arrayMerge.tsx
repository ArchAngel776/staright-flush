export default function arrayMerge<Type>(arrayA: Array<Type>, arrayB: Array<Type>): Array<Type>
{
    return [...arrayA, ...arrayB]
}