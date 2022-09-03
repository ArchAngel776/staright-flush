import Bin from "../interfaces/Bin"
import Structure from "../interfaces/Structure"

export type Safe = boolean | number | string | symbol | Bin | Structure | undefined | Array<Safe>