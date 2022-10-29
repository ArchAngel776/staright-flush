import { ClientSession, Collection, Db, Document } from "mongodb";
export default abstract class Migration {
    protected database: Db;
    protected session: ClientSession;
    constructor(database: Db, session: ClientSession);
    hasCollection(name: string): Promise<boolean>;
    createCollection<Schema extends Document>(name: string, schema: Schema): Promise<Collection<Schema>>;
    dropCollection(name: string): Promise<boolean>;
    hasIndex(name: string, collection: string): Promise<boolean>;
    createIndex(name: string, collection: string, fields: string | Array<string>, unique?: boolean): Promise<string>;
    dropIndex(name: string, collection: string): Promise<Document>;
    abstract apply(): Promise<boolean>;
    abstract revert(): Promise<boolean>;
}
