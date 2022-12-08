import Cli from "../src/Cli"
import { Console } from "../src/core/data/enums/Console"
import TestThrowException from "../src/exceptions/TestThrowException"

test("Check Test Command", async () => 
{
    const log = jest.spyOn(console, "log")
    const param = "custom-command"

    const cli = new Cli("test-command", param)
    await cli.run()

    expect(log).toHaveBeenCalledWith(Console.WHITE, `Command with param: ${param}`)
})

test("Check Test Command with default param", async () =>
{
    const log = jest.spyOn(console, "log")

    const cli = new Cli("test-command")
    await cli.run()

    expect(log).toHaveBeenCalledWith(Console.WHITE, "Command with param: foo")
})

test("Check Test Command with throw", async () => 
{
    const log = jest.spyOn(console, "log")
    const exception = new TestThrowException

    const cli = new Cli("test-command", "throw")
    await cli.run()

    expect(log).toHaveBeenCalledWith(Console.RED, `${exception.name}: ${exception.message}`)
})