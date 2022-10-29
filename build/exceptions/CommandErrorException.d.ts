import Exception from "../core/Exception";
export default class CommandErrorException extends Exception {
    getName(): string;
    getMessage(): string;
}
