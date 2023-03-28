import { AnimationAction, AnimationClip, KeyframeTrack, LoopOnce } from "three"
import AnimationFinishCallback from "../../data/callbacks/AnimationFinishCallback"
import GameObject from "../../data/interfaces/GameObject"
import RegisterAction from "../../decorators/RegisterAction"
import SetupAction from "../../decorators/SetupAction"
import AnimationBuilder from "../tools/AnimationBuilder"


export default abstract class AnimationFacade<Component extends GameObject>
{
    protected component: Component

    protected onFinishListeners: Array<AnimationFinishCallback>

    public constructor(component: Component)
    {
        this.component = component
        this.onFinishListeners = []
    }

    public onFinish(callback: AnimationFinishCallback): this
    {
        this.onFinishListeners.push(callback)
        return this
    }

    @SetupAction
    @RegisterAction
    protected action(name: string, duration: number, tracks: Array<KeyframeTrack>): AnimationAction
    {
        const clip = new AnimationClip(name, duration, tracks)
        return this.component
            .getMixer()
            .getAnimationMixer()
            .clipAction(clip)
            .setLoop(LoopOnce, 1)
    }

    protected getBuilder(): AnimationBuilder
    {
        return new AnimationBuilder(this.component.getObject())
    }
}