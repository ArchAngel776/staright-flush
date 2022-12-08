import ModelSchema from "../data/interfaces/ModelSchema"
import { Scenarios } from "../data/interfaces/Scenarios"
import { ModelConstructor } from "./constructors/ModelConstuctor"
import { ModelAttributesKeys } from "../data/symbols/ModelAttributesKeys"
import { ModelDefaultsKeys } from "../data/symbols/ModelDefaultsKeys"
import { ModelAttribute } from "../data/symbols/ModelAttribute"
import { ModelDefault } from "../data/symbols/ModelDefault"
import defined from "../hooks/defined"
import "reflect-metadata"

export default function ModelSignature<Schema extends ModelSchema>()
{
    return function <Target extends ModelConstructor<Schema>>(Target: Target): Target
    {
        return class extends Target
        {
            public validation(): Scenarios<Schema>
            {
                const validators = super.validation()
                const keys: Array<keyof Schema> = Reflect.getOwnMetadata(ModelAttributesKeys, Target.prototype) || []

                keys.forEach(attribute => {
                    if (!defined(validators[attribute])) {
                        validators[attribute] = []
                    }
                    validators[attribute]?.push(...Reflect.getOwnMetadata(ModelAttribute, Target.prototype, <string> attribute))
                })
                return validators
            }

            public defaults(): Partial<Schema>
            {
                const defaults = super.defaults()
                const keys: Array<keyof Schema> = Reflect.getOwnMetadata(ModelDefaultsKeys, Target.prototype) || []

                keys.forEach(attribute => defaults[attribute] = Reflect.getOwnMetadata(ModelDefault, Target.prototype, <string> attribute))
                return defaults
            }
        }
    }
}