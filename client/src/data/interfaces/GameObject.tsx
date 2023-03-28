import { Object3D } from "three"
import Mixer from "../../engine/helpers/Mixer"


export default interface GameObject
{
    getObject(): Object3D
    getMixer(): Mixer
}