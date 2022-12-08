import ValidationScenarios from "../../../components/ValidationScenarios"
import MethodModel from "../../../foundations/MethodModel"

export default class CreateIfNotExists<Schema> extends MethodModel<ValidationScenarios<Schema>, ValidationScenarios<Schema>, [keyof Schema, string]>
{
    public method(attribute: keyof Schema, message: string): ValidationScenarios<Schema>
    {
        const scenarios = this.target.getAllScenarios()
        if (attribute in scenarios === false) {
            scenarios[attribute] = []
            this.target.modelScenarios = scenarios
        }
        return this.original(attribute, message)
    }
}