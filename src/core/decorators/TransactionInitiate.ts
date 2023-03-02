import Connection from "../components/database/Connection"
import Transaction from "../components/database/Transaction"
import MethodModel from "../foundations/MethodModel"

export default class TransactionInitiate extends MethodModel<Connection, Promise<Transaction>>
{
    public async method(this: Connection, { original, init }: TransactionInitiate): Promise<Transaction>
    {
        return original().then(init)
    }

    public init(transaction: Transaction): Transaction
    {
        transaction.init()
        return transaction
    }
}