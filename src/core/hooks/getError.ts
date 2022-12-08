export default function getError(error: unknown): string
{
    if (error instanceof Error) {
        return error.message
    }
    else if (typeof error === "string") {
        return error
    }
    return new String(error).toString()
}