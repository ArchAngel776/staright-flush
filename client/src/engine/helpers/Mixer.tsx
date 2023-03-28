import { AnimationMixer, Object3D } from "three"
import AnimationWrapper from "./AnimationWrapper"


export default class Mixer
{
    protected animationMixer: AnimationMixer

    protected currentAnimation: AnimationWrapper | null

    protected lastTime: Date | null

    public constructor(object: Object3D)
    {
        this.animationMixer = new AnimationMixer(object)
        this.currentAnimation = null
        this.lastTime = null
    }

    public setAnimation(cuurentAnimation: AnimationWrapper): this
    {
        this.currentAnimation = cuurentAnimation
        return this
    }

    public clearAnimation(): this
    {
        this.currentAnimation = null
        return this
    }

    public getAnimationMixer(): AnimationMixer
    {
        return this.animationMixer
    }

    public getDelta(): number
    {
        const now = new Date()
        const result = this.lastTime ? (now.getTime() - this.lastTime.getTime()) / 600 : this.defaultDelta
        this.lastTime = now
        return result
    }

    public handleAnimation(): this
    {
        if (this.currentAnimation?.isFinished) {
            this.currentAnimation.dispatchEvent({
                type: AnimationWrapper.EVENT_FINISHED,
                target: this.currentAnimation.getAction()
            })
            return this.clearAnimation()
        }
        return this
    }

    protected get defaultDelta(): number
    {
        return 1 / 60
    }
}