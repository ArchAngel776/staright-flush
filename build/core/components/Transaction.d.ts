import { ClientSession, Db, MongoClient, TransactionOptions } from "mongodb";
import DatabaseSessionOperation from "../data/callbacks/DatabaseSessionOperation";
import WithMongoClient from "../data/interfaces/WithMongoClient";
export default class Transaction implements WithMongoClient {
    static OPTIONS: TransactionOptions;
    protected _client: MongoClient;
    protected session: ClientSession;
    protected database: Db;
    constructor(client: MongoClient, database: string);
    init(): void;
    make<Type>(operation: DatabaseSessionOperation<Type>): Promise<Type>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
    get client(): MongoClient;
}
