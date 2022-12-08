import Structure from "../data/interfaces/Structure"

export default function map<Type extends object = Structure>(target: Array<Structure>, propertyKey: string, propertyValue: string): Type
{
    const result = {} as Type
    for (const item of target) {
        if (propertyKey in item && propertyValue in item) {
            const key = item[propertyKey] as keyof Type
            const value = item[propertyValue]
            
            result[key] = value
        }
    }
    return result
}