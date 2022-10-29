import { Console } from "../data/enums/Console"
import { String } from "../data/enums/String"

export default function print(message: string = String.EMPTY, color = Console.WHITE): void
{
    console.log(color, message)
}