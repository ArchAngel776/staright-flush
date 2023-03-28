import { Scene, PerspectiveCamera, WebGLRenderer } from "three"
import GameEngineObserver from "../data/callbacks/GameEngineObserver"
import { GameEngineEvent } from "../data/enums/GameEngineEvent"
import GameObject from "../data/interfaces/GameObject"
import { GameEngineObservers } from "../data/types/GameEngineObservers"


export default class Game
{
    protected readonly scene: Scene

    protected readonly camera: PerspectiveCamera

    protected readonly renderer: WebGLRenderer

    protected observers: GameEngineObservers

    protected started: boolean

    public constructor(fov?: number)
    {
        this.scene = new Scene
        this.camera = new PerspectiveCamera(fov, window.innerWidth / window.innerHeight, .1, 10000)
        this.renderer = new WebGLRenderer

        this.observers = {
            [GameEngineEvent.INIT]: [],
            [GameEngineEvent.RENDER]: []
        }

        this.started = false

        this.render = this.render.bind(this)
    }

    public start(): void
    {
        this.started = true
    }

    public on(event: GameEngineEvent, observer: GameEngineObserver): this
    {
        this.observers[event].push(observer)
        return this
    }

    public init(root: HTMLDivElement): void
    {
        this.renderer.setClearColor(0x1F1F1F)
        this.renderer.setSize(window.innerWidth, window.innerHeight, true)

        this.observers[GameEngineEvent.INIT].forEach(observer => observer(this.scene, this.camera))

        root.appendChild(this.renderer.domElement)
    }

    public add(gameObject: GameObject, animationsOnly: boolean = false): this
    {
        if (!animationsOnly) {
            this.scene.add(gameObject.getObject())
        }

        const mixer = gameObject.getMixer()
        this.observers.render.push(() => mixer.handleAnimation().getAnimationMixer().update(mixer.getDelta()))

        return this
    }

    public render(): void
    {
        requestAnimationFrame(this.render)

        this.observers[GameEngineEvent.RENDER].forEach(observer => observer(this.scene, this.camera))

        this.renderer.render(this.scene, this.camera)
    }

    public get isStarted(): boolean
    {
        return this.started
    }
}