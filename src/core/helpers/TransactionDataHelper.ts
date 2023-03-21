import { ClientSession, Db } from "mongodb"


export default class TransactionDataHelper
{
    protected _database: Db

    protected _session: ClientSession

    public constructor(database: Db, session: ClientSession)
    {
        this._database = database
        this._session = session
    }

    public get database(): Db
    {
        return this._database
    }

    public get session(): ClientSession
    {
        return this._session
    }
}