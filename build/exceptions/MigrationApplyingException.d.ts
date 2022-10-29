import MigrationExecutorException from "../core/foundations/MigrationExecutorException";
export default class MigrationApplyingException extends MigrationExecutorException {
    getName(): string;
    getMessage(): string;
}
