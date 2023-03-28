import { AnimationAction, Event } from "three"


export default interface AnimationFinishEvent extends Event
{
    target: AnimationAction
}