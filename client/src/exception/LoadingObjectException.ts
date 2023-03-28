export default class LoadingObjectException extends Error
{
    public constructor()
    {
        super()
    }

    public get name(): string
    {
        return "Loading Model Exception"
    }

    public get message(): string
    {
        return "Erorr meanwhile loading model: Imported object is not a valid mesh"
    }
}