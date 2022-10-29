import { MongoClient } from "mongodb";
import MongoURL from "../helpers/MongoUrl";
import DatabaseOperation from "../data/callbacks/DatabaseOperation";
import Transaction from "./Transaction";
export default class Connection {
    protected static readonly instance: Connection;
    protected readonly mongoURL: MongoURL;
    protected database: string;
    constructor(host: string, port: number, database: string, user?: string, password?: string);
    setHost(host: string): this;
    setPort(port: number): this;
    setUser(user: string): this;
    setPassword(password: string): this;
    setDatabase(database: string): this;
    getClient(): Promise<MongoClient>;
    make<Type>(operation: DatabaseOperation<Type>): Promise<Type>;
    beginTransaction(): Promise<Transaction>;
    static getConnection(): Connection;
}
