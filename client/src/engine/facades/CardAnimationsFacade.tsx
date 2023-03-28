import { AnimationAction } from "three"
import euler from "../../hooks/euler"
import vector from "../../hooks/vector"
import Card from "../components/Card"
import AnimationFacade from "../foundations/AnimationsFacade"


export default class CardAnimationFacade extends AnimationFacade<Card>
{
    public static ACTION_TURN = "Turn"
    public static ACTION_PREPARE_TO_SCHUFFLE = "PrepareToSchuffle"

    public turn(): AnimationAction
    {
        const tracksBuilder = this.getBuilder()
            .translation()
            .to(vector({ y: 2.5 }))
            .to(vector({ y: -2.5 }))
            .add()
            .rotation()
            .to(euler({ z: -Math.PI / 2 }))
            .to(euler({ z: -Math.PI / 2 }))
            .add()

        return this.action(CardAnimationFacade.ACTION_TURN, 2, tracksBuilder.getTracks())
    }

    public prepareToSchuffle(): AnimationAction
    {
        const tracksBuilder = this.getBuilder()
            .translation()
            .to(vector({ z: -this.component.getDimensions().width }))
            .add()
        
        return this.action(CardAnimationFacade.ACTION_PREPARE_TO_SCHUFFLE, 1, tracksBuilder.getTracks())
    }
}