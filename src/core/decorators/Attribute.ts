import ModelSchema from "../data/interfaces/ModelSchema"
import { Attr } from "../data/types/Attr"
import { ValidationConstructor } from "../data/types/ValidationConstructor"
import Validation, { ValidationData } from "../foundations/Validation"
import Model from "../Model"
import { ModelAttribute } from "../data/symbols/ModelAttribute"
import { ModelAttributesKeys } from "../data/symbols/ModelAttributesKeys"
import uniqueFilter from "../hooks/uniqueFilter"
import "reflect-metadata"

export default function Attribute<Schema extends ModelSchema, Data extends ValidationData>(Validation?: ValidationConstructor<Schema, Data>, data: Partial<Data> = {})
{
    return function <Target extends Model<Schema>>(target: Target, attribute: keyof Schema)
    {
        type Attribute = Schema[keyof Schema]

        Object.defineProperty(target, attribute, {
            get(this: Target): Attr<Attribute>
            {
                return this.attributes[attribute]
            },
            set(value: Attribute)
            {
                this.attributes[attribute] = value
            }
        })

        if (Validation) {
            const validatorsKeys: Array<string> = Reflect.getOwnMetadata(ModelAttributesKeys, target) || []
            validatorsKeys.push(<string> attribute)

            Reflect.defineMetadata(ModelAttributesKeys, validatorsKeys.filter(uniqueFilter), target)

            const validators: Array<Validation<Schema, Data>> = Reflect.getOwnMetadata(ModelAttribute, target, <string> attribute) || []
            validators.push(new Validation(data))

            Reflect.defineMetadata(ModelAttribute, validators, target, <string> attribute)
        }
    }
}