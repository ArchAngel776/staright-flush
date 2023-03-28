import { KeyframeTrack } from "three"
import AnimationBuilder from "../tools/AnimationBuilder"


export default abstract class AnimationFrameBuilder<Element>
{
    protected animationBuilder: AnimationBuilder

    protected steps: Array<Element>

    protected customFrames: Array<number> | null

    public constructor(animationBuilder: AnimationBuilder, startStep: Element)
    {
        this.animationBuilder = animationBuilder
        this.steps = [startStep]
        this.customFrames = null
    }

    public to(step: Element): this
    {
        this.steps.push(step)
        return this
    }

    public frames(customFrames: Array<number>): this
    {
        this.customFrames = customFrames
        return this
    }

    protected get times(): Array<number>
    {
        return this.customFrames || this.steps.map((step, index) => index)
    }

    protected get last(): Element
    {
        return this.steps[this.steps.length - 1]
    }

    protected abstract create(): KeyframeTrack

    public add(): AnimationBuilder
    {
        return this.animationBuilder.addTrack(this.create())
    }
}