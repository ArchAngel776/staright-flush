import { AnimationAction, EventDispatcher } from "three"
import AnimationFinishEvent from "../../data/interfaces/AnimationFinishEvent"


export default class AnimationWrapper extends EventDispatcher<AnimationFinishEvent>
{
    public static EVENT_FINISHED = "finished"

    protected action: AnimationAction

    public constructor(action: AnimationAction)
    {
        super()
        this.action = action
    }

    public getAction(): AnimationAction
    {
        return this.action
    }

    public get isFinished(): boolean
    {
        return !this.action.isRunning()
    }
}