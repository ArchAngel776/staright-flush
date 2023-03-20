import { OperationOptions } from "mongodb"

import DatabaseOperation from "@data/callbacks/DatabaseOperation"
import { TransactionData } from "@data/types/TransactionData"

import TransactionDataHelper from "@helpers/TransactionDataHelper"
import Connection from "@components/database/Connection"


export default class CollectionDocument
{
    protected readonly connection: Connection

    protected transaction: TransactionDataHelper | undefined

    public constructor()
    {
        this.connection = Connection.getConnection()
    }

    public withSession(transaction?: TransactionData): this
    {
        this.transaction = transaction ? new TransactionDataHelper(...transaction) : transaction
        return this
    }

    protected make<Result>(operation: DatabaseOperation<Result>): Promise<Result>
    {
        return this.transaction ? operation(this.transaction.database) : this.connection.make(operation)
    }

    protected getOptions(): OperationOptions
    {
        const options: OperationOptions = {}
        if (this.transaction) {
            options.session = this.transaction.session
        }
        return options
    }
}