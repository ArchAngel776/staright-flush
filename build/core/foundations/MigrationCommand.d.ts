import Command from "../Command";
import WorkSpace from "../components/WorkSpace";
export default abstract class MigrationCommand extends Command {
    static MIGRATIONS_DIR: string;
    static MIGRATION_PREFIX: string;
    protected path: string;
    protected migrationDir: WorkSpace;
    constructor();
    check(): boolean;
}
