import { String } from "../data/enums/String"

export default function root(): string
{
    return require.main?.path || String.EMPTY
}