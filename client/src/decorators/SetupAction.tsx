import { KeyframeTrack, AnimationAction } from "three"
import GameObject from "../data/interfaces/GameObject"
import { AnimationFacadeAction } from "../data/types/AnimationFacadeAction"
import AnimationFacade from "../engine/foundations/AnimationsFacade"


export default function SetupAction<Component extends GameObject>(target: AnimationFacade<Component>, property: "action", descriptor: TypedPropertyDescriptor<AnimationFacadeAction>): void
{
    const action = descriptor.value
    if (!action) {
        return
    }

    descriptor.value = function (this: AnimationFacade<Component>, name: string, duration: number, tracks: Array<KeyframeTrack>): AnimationAction
    {
        const result = action.call(this, name, duration, tracks)
        result.clampWhenFinished = true
        return result
    }
}