import Commands from "./commands/index"
import { CommandConstructor } from "./core/data/types/CommandContructor"
import UnknownCommandException from "./exceptions/UnknownCommandException"

export default class Cli
{
    protected command: string

    protected arguments: Array<string>

    public constructor(command: string, ...args: Array<string>)
    {
        this.command = command
        this.arguments = args
    }

    protected getCommand(): CommandConstructor
    {
        if (this.command in Commands) {
            return Commands[this.command]
        }
        throw new UnknownCommandException(this.command)
    }

    public run(): void
    {
        const Command = this.getCommand()
        const command = new Command(...this.arguments)

        command.init()
        if (command.check()) {
            command.except(command.execute())
        }
    }
}