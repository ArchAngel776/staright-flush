import ModelSchema from "../data/interfaces/ModelSchema"
import { ModelDefault } from "../data/symbols/ModelDefault"
import Model from "../Model"
import { ModelDefaultsKeys } from "../data/symbols/ModelDefaultsKeys"
import uniqueFilter from "../hooks/uniqueFilter"
import "reflect-metadata"

export default function Default<Schema extends ModelSchema>(value: Schema[keyof Schema])
{
    return function (target: Model<Schema>, attribute: keyof Schema)
    {
        const defaultsKeys: Array<string> = Reflect.getOwnMetadata(ModelDefaultsKeys, target) || []
        defaultsKeys.push(<string> attribute)

        Reflect.defineMetadata(ModelDefaultsKeys, defaultsKeys.filter(uniqueFilter), target)
        Reflect.defineMetadata(ModelDefault, value, target, <string> attribute)
    }
}