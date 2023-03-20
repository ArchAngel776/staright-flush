export default abstract class Event<Target, Data = object>
{
    protected target: Target

    protected data: Data

    public constructor(target: Target, data: Data)
    {
        this.target = target
        this.data = data
    }

    public abstract getName(): string

    public getTarget(): Target
    {
        return this.target
    }
}