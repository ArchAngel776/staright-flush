export default function assert(condition: boolean, exception?: string | Error): void | never
{
    if (!condition) {
        throw exception || new Error("Asseration failed")
    }
}