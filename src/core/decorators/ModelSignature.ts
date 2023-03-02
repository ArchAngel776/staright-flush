import ModelSchema from "../data/interfaces/ModelSchema"
import { Scenarios } from "../data/interfaces/Scenarios"
import { ModelConstructor } from "./constructors/ModelConstuctor"
import { ModelAttributesKeys } from "../data/symbols/ModelAttributesKeys"
import { ModelDefaultsKeys } from "../data/symbols/ModelDefaultsKeys"
import { ModelAttribute } from "../data/symbols/ModelAttribute"
import { ModelDefault } from "../data/symbols/ModelDefault"
import { Keyof } from "../data/types/Keyof"
import multi from "../hooks/multi"
import { Defaults } from "../data/types/Defaults"
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
                const keys: Array<Keyof<Schema>> = Reflect.getOwnMetadata(ModelAttributesKeys, Target.prototype) || []

                keys.forEach(attribute => {
                    const validator = multi(validators[attribute] || [])
                    validators[attribute] = validator.splice(validator.length, 0, ...Reflect.getOwnMetadata(ModelAttribute, Target.prototype, attribute))
                })

                return validators
            }

            public defaults(): Defaults<Schema>
            {
                const defaults = super.defaults()
                const keys: Array<Keyof<Schema>> = Reflect.getOwnMetadata(ModelDefaultsKeys, Target.prototype) || []

                keys.forEach(attribute => defaults[attribute] = Reflect.getOwnMetadata(ModelDefault, Target.prototype, <string> attribute))
                return defaults
            }
        }
    }
}