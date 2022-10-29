/* eslint-disable @typescript-eslint/no-unused-vars */
import Except from "../core/decorators/Except"
import MigrationExecutorException from "../core/foundations/MigrationExecutorException"

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