import Exception from "../Exception";
export default abstract class MigrationExecutorException extends Exception {
    protected migrationName: string;
    constructor(migrationName: string | undefined);
}
