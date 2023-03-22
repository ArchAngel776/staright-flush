export default class LoginErrorActionException extends Error
{
    public constructor()
    {
        super()
    }

    public get name(): string
    {
        return "Login Error Action Exception"
    }

    public get message(): string
    {
        return `Cannot recognize action type for login errors dispatch.`
    }
}