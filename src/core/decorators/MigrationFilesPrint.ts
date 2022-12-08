import { Console } from "../data/enums/Console"
import { AsyncAwait } from "../data/types/AsyncAwait"
import MethodModel from "../foundations/MethodModel"
import MigrationExecutor from "../foundations/MigrationExecutor"
import print from "../hooks/print"

export default class MigrationFilesPrint extends MethodModel<MigrationExecutor, AsyncAwait<number>>
{
    protected title: string

    public constructor(target: MigrationExecutor, title: string)
    {
        super(target)
        this.title = title
    }

    public method(): AsyncAwait<number>
    {
        print(this.title)
        this.target.migrationsList.forEach(migraion => print(migraion, Console.YELLOW))
        print()
        return this.original()
    }
}