/* eslint-disable @typescript-eslint/no-unused-vars */
import Except from "../core/decorators/Except"
import MigrationExecutorException from "../core/foundations/MigrationExecutorException"

@Except
export default class MigrationRevertingException extends MigrationExecutorException
{
    public getName(): string
    {
        return "Migration Reverting Exception"
    }

    public getMessage(): string
    {
        return `Error - cannot reverting migration ${this.migrationName}`
    }
}