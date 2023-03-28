export default class RegisterErrorActionException extends Error
{
    public constructor()
    {
        super()
    }

    public get name(): string
    {
        return "Register Error Action Exception"
    }

    public get message(): string
    {
        return "Cannot recognize action type for register errors dispatch."
    }
}