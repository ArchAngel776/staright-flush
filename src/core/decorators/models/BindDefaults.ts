import ModelSchema from "../../data/interfaces/ModelSchema"
import { Keyof } from "../../data/types/Keyof"
import { Valueof } from "../../data/types/Valueof"
import MethodModel from "../../foundations/MethodModel"
import NeastedObjectHelper from "../../helpers/NeastedObjectHelper"
import defined from "../../hooks/defined"
import Model from "../../Model"

export default class BindDefaults<Schema extends ModelSchema> extends MethodModel<Model<Schema>, void | boolean>
{
    public method(this: Model<Schema>, { original }: BindDefaults<Schema>): void | boolean
    {
        const helper = new NeastedObjectHelper(<Schema> this.attributes)
        const defaults = this.defaults()

        for (const property in defaults) {
            const attribute = <Keyof<Schema>> property
        
            if (defined(helper.get(attribute))) {
                continue
            }

            helper.set(attribute, <Valueof<Schema, Keyof<Schema>>> defaults[attribute])
        }

        this.attributes = helper.result
        return original()
    }
}