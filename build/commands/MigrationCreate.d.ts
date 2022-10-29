import MigrationCommand from "../core/foundations/MigrationCommand";
export default class MigrationCreate extends MigrationCommand {
    /**
     * Custom statuses
     */
    static MIGRATION_CREATE_ERROR: number;
    protected name: string;
    protected date: Date;
    constructor(name: string);
    execute(): number;
    except(status: number): void;
    protected get migrationName(): string;
    protected get migrationFileName(): string;
}
