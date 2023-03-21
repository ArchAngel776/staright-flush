/* eslint-disable @typescript-eslint/no-unused-vars */
import MigrationExecutorException from "@foundations/MigrationExecutorException"
import Except from "@decorators/Except"


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