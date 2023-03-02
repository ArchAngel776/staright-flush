import ValidationScenarios from "../../../components/ValidationScenarios"
import { Keyof } from "../../../data/types/Keyof"
import MethodModel from "../../../foundations/MethodModel"

export default class CreateIfNotExists<Schema> extends MethodModel<ValidationScenarios<Schema>, ValidationScenarios<Schema>, [attribute: Keyof<Schema>, message: string]>
{
    public method(this: ValidationScenarios<Schema>, { original }: CreateIfNotExists<Schema>, attribute: Keyof<Schema>, message: string): ValidationScenarios<Schema>
    {
        const scenarios = this.getAllScenarios()
        if (attribute in scenarios === false) {
            scenarios[attribute] = []
            this.modelScenarios = scenarios
        }
        return original(attribute, message)
    }
}