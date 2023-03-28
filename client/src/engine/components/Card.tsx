import { Euler } from "three"
import { CardColor } from "../../data/enums/CardColor"
import { CardType } from "../../data/enums/CardType"
import Dimensions from "../../data/interfaces/Dimenstions"
import GameObject from "../../data/interfaces/GameObject"
import { CardsMesh } from "../../data/types/CardsMesh"
import box3size from "../../hooks/box3size"
import CardAnimationFacade from "../facades/CardAnimationsFacade"
import CardsFactory from "../helpers/CardsFactory"
import Mixer from "../helpers/Mixer"


export default class Card implements GameObject
{
    protected mesh: CardsMesh

    protected mixer: Mixer

    public constructor(mesh: CardsMesh)
    {
        this.mesh = mesh
        this.mixer = new Mixer(this.mesh)
    }

    public init(): this
    {
        this.mesh.position.set(0, 0, 0)
        this.mesh.quaternion.setFromEuler(new Euler(Math.PI, Math.PI / 2, 0), true)

        return this
    }

    public getDimensions(): Dimensions
    {
        this.mesh.geometry.computeBoundingBox()
        return this.mesh.geometry.boundingBox ?
            box3size(this.mesh.geometry.boundingBox) :
            { width: 0, height: 0, depth: 0 }
    }

    public animation(): CardAnimationFacade
    {
        return new CardAnimationFacade(this)
    }

    public getObject(): CardsMesh
    {
        return this.mesh
    }

    public getMixer(): Mixer
    {
        return this.mixer
    }

    public static async create(color: CardColor, type: CardType): Promise<Card>
    {
        return new Card(await new CardsFactory().createCard(color, type))
    }
}