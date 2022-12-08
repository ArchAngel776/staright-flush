import Command from "../core/Command"
import defined from "../core/hooks/defined"
import print from "../core/hooks/print"
import TestThrowException from "../exceptions/TestThrowException"

export default class TestCommand extends Command
{
    public static THROW = -2

    protected testString: string

    public constructor(testString: string)
    {
        super()
        this.testString = testString
    }

    public init(): void 
    {
        if (!defined(this.testString)) {
            this.testString = "foo"
        }
    }

    public check(): boolean
    {
        return this.testString.length > 0
    }

    public execute(): number 
    {
        if (this.testString === "throw") {
            return TestCommand.THROW
        }

        print(`Command with param: ${this.testString}`)
        return TestCommand.SUCCESS
    }

    public except(status: number): void 
    {
        switch (status) {
            case TestCommand.THROW:
                throw new TestThrowException
            default:
                super.except(status)
        }
    }
}