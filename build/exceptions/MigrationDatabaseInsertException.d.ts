import Exception from "../core/Exception";
export default class MigrationDatabaseInsertException extends Exception {
    getName(): string;
    getMessage(): string;
}
