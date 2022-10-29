import Exception from "../core/Exception";
export default class MigrationCreateException extends Exception {
    getName(): string;
    getMessage(): string;
}
