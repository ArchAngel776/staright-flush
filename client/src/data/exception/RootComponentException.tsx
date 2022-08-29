export default class RootComponentException extends Error
{
    public constructor()
    {
        super()
        this.name = "Root Component Exception"
        this.message = "Cannot load root component"
    }
}