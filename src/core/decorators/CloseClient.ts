import Bin from "../data/interfaces/Bin"
import WithMongoClient from "../data/interfaces/WithMongoClient"
import { AsyncAwait } from "../data/types/AsyncAwait"
import { Safe } from "../data/types/Safe"

export default function CloseClient(target: WithMongoClient, property: string, descriptor: PropertyDescriptor)
{
    const method: Bin<AsyncAwait<Safe>> = descriptor.value
    descriptor.value = async function (this: WithMongoClient, ...args: Array<Safe>): Promise<Safe>
    {
        const result = await method.call(this, ...args)
        await this.client.close()
        return result
    }
}