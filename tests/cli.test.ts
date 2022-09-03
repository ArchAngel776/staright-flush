import Cli from "../src/Cli"
import TestThrowException from "../src/exceptions/TestThrowException"

const log = jest.spyOn(console, "log")

test("Check Test Command", () => 
{
    const param = "custom-command"

    const cli = new Cli("test-command", param)
    cli.run()

    expect(log).toHaveBeenCalledWith(`Command with param: ${param}`)
})

test("Check Test Command with default param", () =>
{
    const cli = new Cli("test-command")
    cli.run()

    expect(log).toHaveBeenCalledWith("Command with param: foo")
})

test("Check Test Command with throw", () => 
{
    const cli = new Cli("test-command", "throw")

    expect(() => cli.run()).toThrow(TestThrowException)
})