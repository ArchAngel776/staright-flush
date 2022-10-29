import Exception from "../core/Exception";
export default class UnknownCommandException extends Exception {
    protected command: string;
    constructor(command: string);
    getName(): string;
    getMessage(): string;
}
