import ModelSchema from "@data/interfaces/ModelSchema"
import { ValidationConstructor } from "@data/types/ValidationConstructor"
import { ModelAttribute } from "@data/symbols/ModelAttribute"
import { ModelAttributesKeys } from "@data/symbols/ModelAttributesKeys"
import { ModelAlias } from "@data/symbols/ModelAlias"

import Validation, { ValidationData } from "@foundations/Validation"

import uniqueFilter from "@hooks/uniqueFilter"

import Model from "@core/Model"

import "reflect-metadata"


export default function Attribute<Schema extends ModelSchema, Data extends ValidationData<Schema>>(Validation?: ValidationConstructor<Schema, Data>, data: Partial<Data> = {})
{
    return function <Target extends Model<Schema>>(target: Target, attribute: keyof Schema): void
    {
        const aliases: Array<keyof Schema> = Reflect.getOwnMetadata(ModelAlias, target) || []
        aliases.push(attribute)
        Reflect.defineMetadata(ModelAlias, aliases, target)

        if (Validation) {
            const validatorsKeys: Array<string> = Reflect.getOwnMetadata(ModelAttributesKeys, target) || []
            validatorsKeys.push(attribute.toString())

            Reflect.defineMetadata(ModelAttributesKeys, validatorsKeys.filter(uniqueFilter), target)

            const validators: Array<Validation<Schema, Data>> = Reflect.getOwnMetadata(ModelAttribute, target, attribute.toString()) || []
            validators.push(new Validation(data))

            Reflect.defineMetadata(ModelAttribute, validators, target, attribute.toString())
        }
    }
}