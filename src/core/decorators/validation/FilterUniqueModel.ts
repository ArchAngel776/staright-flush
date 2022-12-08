import { Filter } from "mongodb"
import MethodModel from "../../foundations/MethodModel"
import UniqueValidator from "../../foundations/validation/UniqueValidator"
import defined from "../../hooks/defined"
import merge from "../../hooks/merge"
import Model from "../../Model"

export default class FilterUniqueModel<Schema> extends MethodModel<UniqueValidator<Schema>, Filter<Schema>>
{
    public method(): Filter<Schema>
    {
        if (this.target.target instanceof Model && defined(this.target.target._id)) {
            return merge(this.original(), {
                _id: { $ne: this.target.target._id }
            })
        }

        return this.original()
    }
}