import { Box3 } from "three"
import Dimensions from "../data/interfaces/Dimenstions"


export default function box3size(bounds: Box3): Dimensions
{
    const { min, max } = bounds
    return {
        width: Math.abs(min.x - max.x),
        height: Math.abs(min.y - max.y),
        depth: Math.abs(min.z - max.z)
    }
}