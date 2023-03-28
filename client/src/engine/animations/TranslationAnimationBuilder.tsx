import { KeyframeTrack, Vector3, VectorKeyframeTrack } from "three"
import AnimationFrameBuilder from "../foundations/AnimationFrameBuilder"
import arrayMerge from "../../hooks/arrayMerge"


export default class TranslationAnimationBuilder extends AnimationFrameBuilder<Vector3>
{
    public to(vector: Vector3, relative: boolean = true): this
    {
        if (relative) {
            const { x, y, z } = this.last
            vector.set(x + vector.x, y + vector.y, z + vector.z)
        }
        return super.to(vector)
    }

    protected create(): KeyframeTrack
    {
        const values = this.steps.reduce((values: Array<number>, vector: Vector3) => arrayMerge(values, vector.toArray()), [])
        return new VectorKeyframeTrack(".position", this.times, values)
    }
}