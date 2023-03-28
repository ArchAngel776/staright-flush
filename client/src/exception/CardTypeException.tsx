export default class CardTypeException extends Error
{
    public constructor()
    {
        super()
    }

    public get name(): string
    {
        return "Card Type Exception"
    }

    public get message(): string
    {
        return "Cannot recognize type of card"
    }
}