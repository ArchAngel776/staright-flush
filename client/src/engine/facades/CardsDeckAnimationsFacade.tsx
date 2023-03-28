import { AnimationAction } from "three"
import euler from "../../hooks/euler"
import vector from "../../hooks/vector"
import CardsDeck from "../components/CardsDeck"
import AnimationFacade from "../foundations/AnimationsFacade"


export default class CardsDeckAnimationsFacades extends AnimationFacade<CardsDeck>
{
    public static START_SHUFFLE = "StartShuffle"

    public startShuffle(): AnimationAction
    {
        const tracks = this.getBuilder()
            .translation()
            .to(vector({ y: 3, z: -1 }))
            .add()
            .rotation()
            .to(euler({ x: Math.PI / 4 }))
            .add()
            .getTracks()

        return this.action(CardsDeckAnimationsFacades.START_SHUFFLE, 1, tracks)
    }
}