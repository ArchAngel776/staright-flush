import MigrationManager from "../components/MigrationManager";
import { MigrationConstructor } from "../data/types/MigrationConstructor";
import { Nullable } from "../data/types/Nullable";
import MigrationCommand from "./MigrationCommand";
export default abstract class MigrationExecutor extends MigrationCommand {
    protected migrationManager: MigrationManager;
    protected migrations: Array<string>;
    protected currentMigration: Nullable<MigrationConstructor>;
    constructor();
    check(): boolean;
    protected get migrationPattern(): RegExp;
    get current(): MigrationConstructor;
    set current(migration: MigrationConstructor);
}
