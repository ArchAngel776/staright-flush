export default class CardColorException extends Error
{
    public constructor()
    {
        super()
    }

    public get name(): string
    {
        return "Card Color Exception"
    }

    public get message(): string
    {
        return "Cannot recognize color of card"
    }
}