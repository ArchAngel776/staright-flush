export default class GraphicalDOMException extends Error
{
    public constructor()
    {
        super()
        this.name = "Graphical DOM Exception"
        this.message = "Cannot load DOM for THREE scene"
    }
}