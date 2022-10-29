import { ClientSession, Db } from "mongodb";
import Migration from "../../Migration";
export declare type MigrationConstructor = new (database: Db, session: ClientSession) => Migration;
