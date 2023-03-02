import ModelErrors from "../../../components/ModelErrors"
import { Keyof } from "../../../data/types/Keyof"
import MethodModel from "../../../foundations/MethodModel"

export default class CreateIfNotExists<Schema> extends MethodModel<ModelErrors<Schema>, ModelErrors<Schema>, [attribute: Keyof<Schema>, message: string]>
{
    public method(this: ModelErrors<Schema>, { original }: CreateIfNotExists<Schema>, attribute: Keyof<Schema>, message: string): ModelErrors<Schema>
    {
        const errors = this.getErrors()
        if (attribute in errors === false) {
            errors[attribute] = []
            this.operationErrors = errors
        }
        return original(attribute, message)
    }
}