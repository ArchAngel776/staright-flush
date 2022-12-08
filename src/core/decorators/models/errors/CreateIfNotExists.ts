import ModelErrors from "../../../components/ModelErrors"
import MethodModel from "../../../foundations/MethodModel"

export default class CreateIfNotExists<Schema> extends MethodModel<ModelErrors<Schema>, ModelErrors<Schema>, [keyof Schema, string]>
{
    public method(attribute: keyof Schema, message: string): ModelErrors<Schema>
    {
        const errors = this.target.getErrors()
        if (attribute in errors === false) {
            errors[attribute] = []
            this.target.operationErrors = errors
        }
        return this.original(attribute, message)
    }
}