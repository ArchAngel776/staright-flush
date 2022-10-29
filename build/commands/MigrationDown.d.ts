import MigrationExecutor from "../core/foundations/MigrationExecutor";
export default class MigrationDown extends MigrationExecutor {
    /**
     * Custom statuses
     */
    static MIGRATION_REVERTING_ERROR: number;
    execute(): Promise<number>;
    except(status: number): void;
}
