import { Vector3 } from "three"
import Coordinates from "../data/interfaces/Coordinates"


export default function vector(coordinates: Coordinates = {}): Vector3
{
    const { x, y, z } = coordinates
    return new Vector3(x || 0, y || 0, z || 0)
}