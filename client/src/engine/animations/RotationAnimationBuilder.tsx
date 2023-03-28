import { Euler, KeyframeTrack, Quaternion, QuaternionKeyframeTrack } from "three"
import AnimationFrameBuilder from "../foundations/AnimationFrameBuilder"
import arrayMerge from "../../hooks/arrayMerge"


export default class RotationAnimationBuilder extends AnimationFrameBuilder<Euler>
{
    public to(euler: Euler, relative: boolean = true): this
    {
        if (relative) {
            const { x, y, z } = this.last
            euler.set(x + euler.x, y + euler.y, z + euler.z)
        }
        return super.to(euler)
    }

    protected eulerToQuaternion(euler: Euler): Quaternion
    {
        return new Quaternion().setFromEuler(euler)
    }

    protected create(): KeyframeTrack
    {
        const values = this.steps.reduce((values: Array<number>, euler: Euler) => arrayMerge(values, this.eulerToQuaternion(euler).toArray()), [])
        return new QuaternionKeyframeTrack(".quaternion", this.times, values)
    }
}