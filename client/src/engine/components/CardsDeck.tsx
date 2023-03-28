import { Object3D } from "three"
import CardColors from "../../data/constans/CardColors"
import CardTypes from "../../data/constans/CardTypes"
import GameObject from "../../data/interfaces/GameObject"
import BindCards from "../../decorators/BindCards"
import CardsDeckSecureInit from "../../decorators/CardsDeckSecureInit"
import CardsDeckAnimationsFacades from "../facades/CardsDeckAnimationsFacade"
import Card from "./Card"
import Mixer from "../helpers/Mixer"
import Game from "../Game"


@CardsDeckSecureInit
export default class CardsDeck implements GameObject
{
    protected object: Object3D

    protected cards: Array<Card>

    protected mixer: Mixer

    public constructor()
    {
        this.object = new Object3D
        this.cards = []
        this.mixer = new Mixer(this.object)
    }

    @BindCards
    public async initDeck(): Promise<void>
    {
        for (const color of CardColors) {
            for (const type of CardTypes) {
                this.cards.push(await Card.create(color, type))
            }
        }
    }

    public addToGame(game: Game): void
    {
        for (const card of this.cards) {
            game.add(card, true)
        }
        game.add(this)
    }

    public animations(): CardsDeckAnimationsFacades
    {
        return new CardsDeckAnimationsFacades(this)
    }

    public getObject(): Object3D
    {
        return this.object
    }

    public getCards(): Array<Card>
    {
        return this.cards
    }

    public getMixer(): Mixer
    {
        return this.mixer
    }
}