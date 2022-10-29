import { ClientSession, Collection, Db, Document, IndexSpecification } from "mongodb"

export default abstract class Migration
{
    protected database: Db

    protected session: ClientSession

    public constructor(database: Db, session: ClientSession)
    {
        this.database = database
        this.session = session
    }

    public async hasCollection(name: string): Promise<boolean>
    {
        const collections = await this.database.collections()
        for (const collection of collections) {
            if (collection.collectionName === name) {
                return true
            }
        }
        return false
    }

    public createCollection<Schema extends Document>(name: string, schema: Schema): Promise<Collection<Schema>>
    {
        return this.database.createCollection<Schema>(name, {
            session: this.session,
            validator: { $jsonSchema: schema }
        })
    }

    public dropCollection(name: string): Promise<boolean>
    {
        return this.database.dropCollection(name, {
            session: this.session
        })
    }

    public hasIndex(name: string, collection: string): Promise<boolean>
    {
        return this.database.collection(collection).indexExists(name)
    }

    public createIndex(name: string, collection: string, fields: string|Array<string>, unique = false): Promise<string>
    {
        if (!Array.isArray(fields)) {
            fields = [ fields ]
        }

        const index: IndexSpecification = {}
        fields.forEach(field => index[field] = 1)
        return this.database.collection(collection).createIndex(index, {
            name, unique,
            session: this.session
        })
    }

    public dropIndex(name: string, collection: string): Promise<Document>
    {
        return this.database.collection(collection).dropIndex(name, {
            session: this.session
        })
    }

    public abstract apply(): Promise<boolean>

    public abstract revert(): Promise<boolean>
}