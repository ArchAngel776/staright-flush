import Connection from "./Connection";
import DatabaseSessionOperation from "../data/callbacks/DatabaseSessionOperation";
import { MigrationConstructor } from "../data/types/MigrationConstructor";
export default class MigrationManager {
    protected connection: Connection;
    constructor();
    protected execute(operation: DatabaseSessionOperation<boolean>): Promise<boolean>;
    executeApplying(Migration: MigrationConstructor): Promise<boolean>;
    executeReverting(Migration: MigrationConstructor): Promise<boolean>;
}
