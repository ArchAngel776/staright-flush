export default function empty<Type>(target: Type): boolean
{
    if (Array.isArray(target) || typeof target === "string") {
        return target.length === 0
    }
    else if (typeof target === "object" && target) {
        return Object.keys(target).length === 0
    }
    return true
}