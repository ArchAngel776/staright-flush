/* eslint-disable @typescript-eslint/no-unused-vars */
import { ClientSession, Db, MongoClient } from "mongodb"

import WithMongoClient from "@data/interfaces/WithMongoClient"
import type DatabaseSessionOperation from "@data/callbacks/DatabaseSessionOperation"

import Method from "@helpers/Method"
import SecureTransaction from "@decorators/database/SecureTransaction"
import SecureCommit from "@decorators/database/SecureCommit"
import CloseClient from "@decorators/database/CloseClient"

import { TransactionsConfig } from "@config/Database"


export default class Transaction implements WithMongoClient
{
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
        this.session.startTransaction(TransactionsConfig)
    }

    @Method(SecureTransaction)
    public async make<Type>(operation: DatabaseSessionOperation<Type>): Promise<Type>
    {
        return await operation(this.database, this.session)
    }

    @Method(SecureCommit)
    @Method(CloseClient)
    public async commit(): Promise<void>
    {
        await this.session.commitTransaction()
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