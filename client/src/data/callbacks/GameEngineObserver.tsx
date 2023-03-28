import { Scene, PerspectiveCamera } from "three"

export default interface GameEngineObserver
{
    (scene: Scene, camera: PerspectiveCamera): void
}