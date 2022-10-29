import { String } from "../data/enums/String"

export default class MongoURL
{
    protected host: string

    protected port: number

    protected database: string|null

    protected user: string|null

    protected password: string|null

    public constructor(host: string, port: number, database?: string, user?: string, password?: string)
    {
        this.host = host
        this.port = port
        this.database = database || null
        this.user = user || null
        this.password = password || null
    }

    public setHost(host: string): this
    {
        this.host = host
        return this
    }

    public setPort(port: number): this
    {
        this.port = port
        return this
    }

    public setDatabase(database: string): this
    {
        this.database = database
        return this
    }

    public setUser(user: string): this
    {
        this.user = user
        return this
    }

    public setPassword(password: string): this
    {
        this.password = password
        return this
    }

    protected get credentials(): string
    {
        return this.user && this.password ?
            `${this.user}:${this.password}@` : 
            String.EMPTY
    }

    public buildURL(): string
    {
        return `mongodb://${this.credentials}${this.host}:${this.port}/${this.database}`
    }
}