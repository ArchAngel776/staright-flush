import { Console } from "@data/enums/Console"
import { CommandConstructor } from "@data/types/CommandContructor"

import print from "@hooks/print"

import Commands from "@commands/index"

import UnknownCommandException from "@exceptions/UnknownCommandException"


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

    public async run(): Promise<void>
    {
        const Command = this.getCommand()
        const command = new Command(...this.arguments)

        command.init()
        if (!command.check()) {
            return
        }

        try {
            command.except(await command.execute())
        }
        catch (exception) {
            if (exception instanceof Error) {
                print(`${exception.name}: ${exception.message}`, Console.RED)
            }
        }
        print()
    }
}