import { AnimationAction } from "three"


export default class AnimationSequence
{
    protected animations: Array<AnimationAction>

    public constructor(...animations: Array<AnimationAction>)
    {
        this.animations = animations
    }

    public async play(): Promise<void>
    {
        
    }
}