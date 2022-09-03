export default abstract class Exception extends Error
{
    public abstract getName(): string

    public abstract getMessage(): string
}