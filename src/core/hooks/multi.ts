import { Multi } from "@data/types/Multi"


export default function multi<Type>(target: Multi<Type>): Array<Type>
{
    return target instanceof Array ? target : [ target ]
}