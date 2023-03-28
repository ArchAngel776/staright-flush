export default class ModelLoaderException extends Error
{
    protected extension: string

    public constructor(extension: string)
    {
        super()
        this.extension = extension
    }

    public get name(): string
    {
        return "Model Loader Exception"
    }

    public get message(): string
    {
        return `Game engine doens't handle loader for extension: ${this.extension}`
    }
}