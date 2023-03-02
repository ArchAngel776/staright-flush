import { Multi } from "../data/types/Multi"

export default function multi<Type>(target: Multi<Type>): Array<Type>
{
    return Array.isArray(target) ? target : [ target ]
}