import { Multi } from "../data/types/Multi"

export default function multi<Type>(target: Multi<Type>): Array<Type>
{
    if (Array.isArray(target)) {
        return target
    }
    return [ target ]
}