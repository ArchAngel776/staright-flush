import { Console } from "@data/enums/Console"

import TestThrowException from "@exceptions/TestThrowException"

import Cli from "@cli"


const data = {
    log: jest.spyOn(console, "log")
}

beforeEach(() => {
    data.log = jest.spyOn(console, "log")
})

test("Check Test Command", async () => 
{
    const param = "custom-command"

    const cli = new Cli("test-command", param)
    await cli.run()

    expect(data.log).toHaveBeenCalledWith(Console.WHITE, `Command with param: ${param}`)
})

test("Check Test Command with default param", async () =>
{
    const cli = new Cli("test-command")
    await cli.run()

    expect(data.log).toHaveBeenCalledWith(Console.WHITE, "Command with param: foo")
})

test("Check Test Command with throw", async () => 
{
    const exception = new TestThrowException

    const cli = new Cli("test-command", "throw")
    await cli.run()

    expect(data.log).toHaveBeenCalledWith(Console.RED, `${exception.name}: ${exception.message}`)
})