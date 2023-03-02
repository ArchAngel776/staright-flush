import isRecord from "./isRecord"

export default function clone<Target>(target: Target): Target
{
    if (!isRecord(target)) {
        return target
    }

    const result: Partial<Target> = {}
    for (const property in target) {
        const value = target[property]
        result[property] = clone(value)
    }
    return <Target> result
}