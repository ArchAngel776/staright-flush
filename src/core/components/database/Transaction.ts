/* eslint-disable @typescript-eslint/no-unused-vars */
import { ClientSession, Db, MongoClient, ReadPreference, TransactionOptions } from "mongodb"
import DatabaseSessionOperation from "../../data/callbacks/DatabaseSessionOperation"
import WithMongoClient from "../../data/interfaces/WithMongoClient"
import CloseClient from "../../decorators/CloseClient"
import Method from "../../helpers/Method"

export default class Transaction implements WithMongoClient
{
    public static OPTIONS: TransactionOptions = {
        readConcern: { level: "local" },
        writeConcern: { w: 2 },
        readPreference: new ReadPreference("secondaryPreferred")
    }

    protected _client: MongoClient

    protected session: ClientSession

    protected database: Db

    public constructor(client: MongoClient, database: string)
    {
        this._client = client
        this.session = client.startSession()
        this.database = client.db(database)
    }

    public init(): void
    {
        this.session.startTransaction(Transaction.OPTIONS)
    }

    public make<Type>(operation: DatabaseSessionOperation<Type>): Promise<Type>
    {
        return operation(this.database, this.session)
    }

    @Method(CloseClient)
    public async commit(): Promise<void>
    {
        try {
            await this.session.commitTransaction()
        }
        catch (error) {
            await this.rollback()
            throw error
        }
    }

    @Method(CloseClient)
    public async rollback(): Promise<void>
    {
        await this.session.abortTransaction()
    }

    public get client(): MongoClient
    {
        return this._client
    }
}