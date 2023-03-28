import { KeyframeTrack, Object3D } from "three"
import RotationAnimationBuilder from "../animations/RotationAnimationBuilder"
import TranslationAnimationBuilder from "../animations/TranslationAnimationBuilder"


export default class AnimationBuilder
{
    protected object: Object3D

    protected tracks: Array<KeyframeTrack>

    public constructor(object: Object3D)
    {
        this.object = object
        this.tracks = []
    }

    public translation(): TranslationAnimationBuilder
    {
        return new TranslationAnimationBuilder(this, this.object.position)
    }

    public rotation(): RotationAnimationBuilder
    {
        return new RotationAnimationBuilder(this, this.object.rotation)
    }

    public addTrack(track: KeyframeTrack): this
    {
        this.tracks.push(track)
        return this
    }

    public getTracks(): Array<KeyframeTrack>
    {
        return this.tracks
    }
}