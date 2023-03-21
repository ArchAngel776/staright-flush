import ModelSchema from "@data/interfaces/ModelSchema"
import { Scenarios } from "@data/interfaces/Scenarios"
import { ModelAttributesKeys } from "@data/symbols/ModelAttributesKeys"
import { ModelDefaultsKeys } from "@data/symbols/ModelDefaultsKeys"
import { ModelAttribute } from "@data/symbols/ModelAttribute"
import { ModelDefault } from "@data/symbols/ModelDefault"
import { ModelAlias } from "@data/symbols/ModelAlias"
import { Keyof } from "@data/types/Keyof"
import { Defaults } from "@data/types/Defaults"

import { ModelConstructor } from "@decorators/constructors/ModelConstuctor"

import multi from "@hooks/multi"

import Model from "@core/Model"

import "reflect-metadata"


const descriptor = <Schema extends ModelSchema>(alias: keyof Schema): PropertyDescriptor => ({
    get(this: Model<Schema>) {
        return this.attributes[alias]
    },
    set(this: Model<Schema>, value: Schema[keyof Schema]) {
        this.attributes[alias] = value
    }
})

export default function ModelSignature<Schema extends ModelSchema>()
{
    return function <Target extends ModelConstructor<Schema>>(Target: Target): Target
    {
        return class extends Target
        {
            public constructor(...args: ConstructorParameters<ModelConstructor<Schema>>)
            {
                super(...args)
                
                const aliases: Array<keyof Schema> = Reflect.getOwnMetadata(ModelAlias, Target.prototype) || []
                aliases.forEach(alias => Reflect.defineProperty(this, alias, descriptor(alias)))
            }

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