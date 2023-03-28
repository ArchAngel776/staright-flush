import { KeyframeTrack, AnimationAction } from "three"
import GameObject from "../data/interfaces/GameObject"
import { AnimationFacadeAction } from "../data/types/AnimationFacadeAction"
import AnimationFacade from "../engine/foundations/AnimationsFacade"
import AnimationWrapper from "../engine/helpers/AnimationWrapper"


export default function RegisterAction<Component extends GameObject>(target: AnimationFacade<Component>, property: "action", descriptor: TypedPropertyDescriptor<AnimationFacadeAction>): void
{
    const action = descriptor.value
    if (!action) {
        return
    }

    descriptor.value = function (this: AnimationFacade<Component>, name: string, duration: number, tracks: Array<KeyframeTrack>): AnimationAction
    {
        this.component.getMixer().getAnimationMixer().stopAllAction()

        const result = action.call(this, name, duration, tracks)

        const animation = new AnimationWrapper(result)
        this.onFinishListeners.forEach(listener => animation.addEventListener(AnimationWrapper.EVENT_FINISHED, listener))
        this.component.getMixer().setAnimation(animation)

        return result
    }
}