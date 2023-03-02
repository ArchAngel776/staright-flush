import { Filter } from "mongodb"
import MethodModel from "../../foundations/MethodModel"
import UniqueValidator from "../../foundations/validation/UniqueValidator"
import defined from "../../hooks/defined"
import merge from "../../hooks/merge"
import Model from "../../Model"

export default class FilterUniqueModel<Schema> extends MethodModel<UniqueValidator<Schema>, Filter<Schema>>
{
    public method(this: UniqueValidator<Schema>, { original }: FilterUniqueModel<Schema>): Filter<Schema>
    {
        if (this.target instanceof Model && defined(this.target._id)) {
            return merge(original(), { _id: { $ne: this.target._id }})
        }
        return original()
    }
}