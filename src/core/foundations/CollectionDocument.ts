import { ClientSession, OperationOptions } from "mongodb"
import Connection from "../components/database/Connection"
import { Nullable } from "../data/types/Nullable"

export default class CollectionDocument
{
    protected readonly connection: Connection

    protected session: Nullable<ClientSession>

    public constructor()
    {
        this.connection = Connection.getConnection()
        this.session = null
    }

    public withSession(session: Nullable<ClientSession>): this
    {
        this.session = session
        return this
    }

    protected getOptions(): OperationOptions
    {
        const options: OperationOptions = {}
        if (this.session) {
            options.session = this.session
        }
        return options
    }
}