import { String } from "@data/enums/String"
import { Nullable } from "@data/types/Nullable"


export default class MongoURL
{
    protected static HOSTS_SPLITER = ","

    protected static HOST_PORT_EXPRESSION = /\:([0-9]+)$/

    protected host: string

    protected port: number

    protected database: Nullable<string>

    protected user: Nullable<string>

    protected password: Nullable<string>

    protected replicaSet: Nullable<string>

    public constructor(host: string, port: number, database?: string, user?: string, password?: string, replicaSet?: string)
    {
        this.host = host
        this.port = port
        this.database = database || null
        this.user = user || null
        this.password = password || null
        this.replicaSet = replicaSet || null
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

    public setReplicaSet(replicaSet: string): this
    {
        this.replicaSet = replicaSet
        return this
    }

    protected get credentials(): string
    {
        return this.user && this.password ? `${this.user}:${this.password}@` : String.EMPTY
    }

    protected get hosts(): string
    {
        return this.host.split(MongoURL.HOSTS_SPLITER)
            .map(host => host.match(MongoURL.HOST_PORT_EXPRESSION) ? host : `${host}:${this.port}`)
            .join(MongoURL.HOSTS_SPLITER)
    }

    protected get params(): URLSearchParams
    {
        const params = new URLSearchParams

        if (this.replicaSet) {
            params.set("replicaSet", this.replicaSet)
        }

        return params
    }

    public buildURL(): string
    {
        return `mongodb://${this.credentials}${this.host}/${this.database}?${this.params.toString()}`
    }
}