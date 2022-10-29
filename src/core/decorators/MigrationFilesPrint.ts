import { Console } from "../data/enums/Console"
import Bin from "../data/interfaces/Bin"
import { AsyncAwait } from "../data/types/AsyncAwait"
import { Safe } from "../data/types/Safe"
import MigrationExecutor from "../foundations/MigrationExecutor"
import print from "../hooks/print"

export default function MigrationFilesPrint(titlePrint: string)
{
    return function (target: MigrationExecutor, property: string, descriptor: PropertyDescriptor)
    {
        const method: Bin<AsyncAwait<Safe>> = descriptor.value
        descriptor.value = function (this: MigrationExecutor, ...args: Array<Safe>)
        {
            print(titlePrint)
            this.migrations.forEach(migration => print(migration, Console.YELLOW))
            print()
            return method.call(this, ...args)
        }
    }
}