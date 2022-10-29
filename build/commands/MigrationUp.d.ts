import MigrationExecutor from "../core/foundations/MigrationExecutor";
export default class MigrationUp extends MigrationExecutor {
    /**
     * Custom statuses
     */
    static MIGRATION_APPLYING_ERROR: number;
    execute(): Promise<number>;
    except(status: number): void;
}
