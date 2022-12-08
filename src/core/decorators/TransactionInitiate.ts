import Connection from "../components/database/Connection"
import Transaction from "../components/database/Transaction"
import MethodModel from "../foundations/MethodModel"

export default class TransactionInitiate extends MethodModel<Connection, Promise<Transaction>>
{
    public async method(): Promise<Transaction>
    {
        return this.original().then(this.init)
    }

    protected init(transaction: Transaction): Transaction
    {
        transaction.init()
        return transaction
    }
}