export default class MongoURL {
    protected host: string;
    protected port: number;
    protected database: string | null;
    protected user: string | null;
    protected password: string | null;
    constructor(host: string, port: number, database?: string, user?: string, password?: string);
    setHost(host: string): this;
    setPort(port: number): this;
    setDatabase(database: string): this;
    setUser(user: string): this;
    setPassword(password: string): this;
    protected get credentials(): string;
    buildURL(): string;
}
