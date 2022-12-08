export default function uniqueFilter<Target>(value: Target, index: number, target: Array<Target>): boolean
{
    return target.indexOf(value) === index
}