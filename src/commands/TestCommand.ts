import Command from "../core/Command"
import isDefined from "../core/hooks/isDefined"
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
        if (!isDefined(this.testString)) {
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

        console.log(`Command with param: ${this.testString}`)
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