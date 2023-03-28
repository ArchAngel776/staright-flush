import { Euler } from "three"
import Coordinates from "../data/interfaces/Coordinates"


export default function euler(coordinates: Coordinates): Euler
{
    const { x, y, z } = coordinates
    return new Euler(x || 0, y || 0, z || 0)
}