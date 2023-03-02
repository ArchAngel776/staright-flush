/* eslint-disable @typescript-eslint/no-unused-vars */
import Env from "../../../Env"
import { MongoClient} from "mongodb"
import MongoURL from "../../helpers/MongoUrl"
import DatabaseOperation from "../../data/callbacks/DatabaseOperation"
import Transaction from "./Transaction"
import Method from "../../helpers/Method"
import TransactionInitiate from "../../decorators/TransactionInitiate"

export default class Connection
{
    protected static readonly instance: Connection = new Connection(Env.DB_HOST, parseInt(Env.DB_PORT), Env.DB_NAME, Env.DB_USER, Env.DB_PASS, Env.DB_REPL)

    protected readonly mongoURL: MongoURL

    protected database: string

    protected constructor(host: string, port: number, database: string, user?: string, password?: string, replicaSet?: string)
    {
        this.mongoURL = new MongoURL(host, port, database, user, password, replicaSet)
        this.database = database
    }

    public setHost(host: string): this
    {
        this.mongoURL.setHost(host)
        return this
    }

    public setPort(port: number): this
    {
        this.mongoURL.setPort(port)
        return this
    }

    public setUser(user: string): this
    {
        this.mongoURL.setUser(user)
        return this
    }

    public setPassword(password: string): this
    {
        this.mongoURL.setPassword(password)
        return this
    }

    public setDatabase(database: string): this
    {
        this.mongoURL.setDatabase(this.database = database)
        return this
    }

    public setReplicaSet(replicaSet: string): this
    {
        this.mongoURL.setReplicaSet(replicaSet)
        return this
    }

    public getClient(): Promise<MongoClient>
    {
        return new MongoClient(this.mongoURL.buildURL()).connect()
    }

    public async make<Type>(operation: DatabaseOperation<Type>): Promise<Type>
    {
        const client = await this.getClient()
        return operation(client.db(this.database))
            .then(result => {
                client.close()
                return result
            })
            .catch(error => {
                client.close()
                throw error
            })
    }

    @Method(TransactionInitiate)
    public async beginTransaction(): Promise<Transaction>
    {
        const client = await this.getClient()
        return new Transaction(client, this.database)
    }

    public static getConnection(): Connection
    {
        return this.instance
    }
}