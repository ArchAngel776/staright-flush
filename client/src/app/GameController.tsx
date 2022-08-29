import GraphicalScene from "./GraphicalScene";

export default class GameController
{
    protected domElement: HTMLDivElement

    protected graphicalScene: GraphicalScene

    public constructor(domElement: HTMLDivElement)
    {
        this.domElement = domElement
        this.graphicalScene = new GraphicalScene
    }

    public start(): void
    {
        this.graphicalScene.init(this.domElement)
        setInterval(this.graphicalScene.render.bind(this.graphicalScene), 1000 / GraphicalScene.FPS)
    }
}