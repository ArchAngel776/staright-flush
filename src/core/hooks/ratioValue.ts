import { Ratio } from "@core/data/types/Ratio"

import InvalidRatioValueException from "@exceptions/InvalidRatioValueException"


export default function ratioValue(ratio: Ratio): number
{
    switch (ratio) {
        case "1x1":
            return 1/1
        case "3x4":
            return 3/4
        case "4x3":
            return 4/3
        case "9x16":
            return 9/16
        case "16x9":
            return 16/9
        default:
            throw new InvalidRatioValueException(ratio)
    }
}