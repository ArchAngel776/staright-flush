/* eslint-disable @typescript-eslint/no-unused-vars */
import MigrationExecutorException from "@foundations/MigrationExecutorException"
import Except from "@decorators/Except"


@Except
export default class MigrationApplyingException extends MigrationExecutorException
{
    public getName(): string 
    {
        return "Migration Applying Exception"
    }

    public getMessage(): string 
    {
        return `Error - cannot applying migration ${this.migrationName}`
    }
}