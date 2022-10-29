import { String } from "../data/enums/String"

export default class ZeroLeads
{
    public static format(num: number, length: number): string
    {
        const numString = num.toString().split(String.EMPTY)
        while (numString.length < length) {
            numString.unshift("0")
        }
        return numString.join(String.EMPTY)
    }
}