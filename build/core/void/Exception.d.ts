import ExceptionBase from "../Exception";
export default abstract class Exception extends ExceptionBase {
    getName(): string;
    getMessage(): string;
}
