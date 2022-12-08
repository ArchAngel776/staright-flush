import ModelSchema from "../../data/interfaces/ModelSchema"
import MethodModel from "../../foundations/MethodModel"
import defined from "../../hooks/defined"
import Model from "../../Model"

export default class BindDefaults<Schema extends ModelSchema> extends MethodModel<Model<Schema>, void | boolean>
{
    public method(): void | boolean
    {
        const defaults = this.target.defaults()
        for (const attribute in defaults) {
            if (defined(this.target.attributes[attribute])) {
                continue
            }
            this.target.attributes[attribute] = defaults[attribute]
        }
        return this.original()
    }
}