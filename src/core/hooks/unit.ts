import { Unit } from "@data/enums/Unit"


export function multiplier(size: number, repeat: number, record = 0): number
{
    return record++ >= repeat ? size : multiplier(size * 1024, repeat, record)
}

export default function unit(size: number, unit: Unit): number
{
    return multiplier(size, unit)
}