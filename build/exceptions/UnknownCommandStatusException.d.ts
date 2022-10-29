import Exception from "../core/Exception";
export default class UnknownCommandStatusException extends Exception {
    protected status: number;
    constructor(status: number);
    getName(): string;
    getMessage(): string;
}
