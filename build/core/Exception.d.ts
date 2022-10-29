export default abstract class Exception extends Error {
    abstract getName(): string;
    abstract getMessage(): string;
}
