import Exception from "../core/Exception";
export default class MigrationEmptyException extends Exception {
    getName(): string;
    getMessage(): string;
}
