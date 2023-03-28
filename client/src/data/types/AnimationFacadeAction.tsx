import { AnimationAction, KeyframeTrack } from "three"


export type AnimationFacadeAction = (name: string, duration: number, tracks: Array<KeyframeTrack>) => AnimationAction