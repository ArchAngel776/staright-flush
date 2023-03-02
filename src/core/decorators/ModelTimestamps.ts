import ModelSchema from "../data/interfaces/ModelSchema"
import { Keyof } from "../data/types/Keyof"
import { Multi } from "../data/types/Multi"
import { Valueof } from "../data/types/Valueof"
import NeastedObjectHelper from "../helpers/NeastedObjectHelper"
import multi from "../hooks/multi"
import { ModelTimestampsConstructor } from "./constructors/ModelTimestampsContructor"

export default function ModelTimestamps<Schema extends ModelSchema>(created_at?: Multi<Keyof<Schema>>, updated_at?: Multi<Keyof<Schema>>)
{
    return function <Target extends ModelTimestampsConstructor<Schema>>(Target: Target): Target
    {
        return class extends Target
        {
            public beforeSave(): boolean
            {
                const date = <Valueof<Schema, Keyof<Schema>>> new Date
                const helper = new NeastedObjectHelper(<Schema> this.attributes)
                
                if (created_at) {
                    multi(created_at).forEach(keypath => helper.set(keypath, date))
                }
                
                if (updated_at) {
                    multi(updated_at).forEach(keypath => helper.set(keypath, helper.get(keypath) || date))
                }

                this.attributes = helper.result

                return super.beforeSave()
            }
        }
    }
}