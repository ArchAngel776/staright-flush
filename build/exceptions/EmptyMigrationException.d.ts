import Exception from "../core/Exception";
export default class EmptyMigrationException extends Exception {
    getName(): string;
    getMessage(): string;
}
