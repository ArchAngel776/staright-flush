import MigrationExecutorException from "../core/foundations/MigrationExecutorException";
export default class MigrationRevertingException extends MigrationExecutorException {
    getName(): string;
    getMessage(): string;
}
