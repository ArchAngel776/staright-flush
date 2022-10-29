import Env from "../../Env"
import { MongoClient} from "mongodb"
import MongoURL from "../helpers/MongoUrl"
import DatabaseOperation from "../data/callbacks/DatabaseOperation"
import Transaction from "./Transaction"

export default class Connection
{
    protected static readonly instance: Connection = new Connection(Env.DB_HOST, parseInt(Env.DB_PORT), Env.DB_NAME, Env.DB_USER, Env.DB_PASS)

    protected readonly mongoURL: MongoURL

    protected database: string

    public constructor(host: string, port: number, database: string, user?: string, password?: string)
    {
        this.mongoURL = new MongoURL(host, port, database, user, password)
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

    public getClient(): Promise<MongoClient>
    {
        return new MongoClient(this.mongoURL.buildURL()).connect()
    }

    public async make<Type>(operation: DatabaseOperation<Type>): Promise<Type>
    {
        const client = await this.getClient()
        const result = await operation(client.db(this.database))
        client.close()
        return result
    }

    public async beginTransaction(): Promise<Transaction>
    {
        const client = await this.getClient()
        const transaction = new Transaction(client, this.database)
        transaction.init()
        return transaction
    }

    public static getConnection(): Connection
    {
        return this.instance
    }
}