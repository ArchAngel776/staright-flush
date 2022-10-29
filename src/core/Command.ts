import CommandErrorException from "../exceptions/CommandErrorException"
import UnknownCommandStatusException from "../exceptions/UnknownCommandStatusException"
import { AsyncAwait } from "./data/types/AsyncAwait"

export default abstract class Command
{
    public static SUCCESS = 0
    public static ERROR = -1

    public init(): void 
    {
        void 0
    }

    public check(): boolean
    {
        return true
    }

    public abstract execute(): AsyncAwait<number>

    public except(status: number): void
    {
        switch (status) {
            case Command.SUCCESS:
                return
            case Command.ERROR:
                throw new CommandErrorException
            default:
                throw new UnknownCommandStatusException(status)
        }
    }
}