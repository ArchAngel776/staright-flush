import ModelSchema from "../data/interfaces/ModelSchema"
import { Multi } from "../data/types/Multi"
import multi from "../hooks/multi"
import { ModelTimestampsConstructor } from "./constructors/ModelTimestampsContructor"

export default function ModelTimestamps<Schema extends ModelSchema>(created_at?: Multi<keyof Schema>, updated_at?: Multi<keyof Schema>)
{
    return function <Target extends ModelTimestampsConstructor<Schema>>(Target: Target): Target
    {
        return class extends Target
        {
            public beforeSave(): boolean
            {
                const date = <Schema[keyof Schema]> new Date
                
                if (created_at) {
                    multi(created_at).forEach(attribute => this.attributes[attribute] = this.attributes[attribute] || date)
                }

                if (updated_at) {
                    multi(updated_at).forEach(attribute => this.attributes[attribute] = date)
                }

                return super.beforeSave()
            }
        }
    }
}