import AnimationFinishEvent from "../interfaces/AnimationFinishEvent"


export default interface AnimationFinishCallback
{
    (event: AnimationFinishEvent): void | Promise<void>
}