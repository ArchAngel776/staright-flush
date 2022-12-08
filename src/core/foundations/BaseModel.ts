import ModelErrors from "../components/ModelErrors"
import ValidationScenarios from "../components/ValidationScenarios"
import { Scenarios } from "../data/interfaces/Scenarios"
import getError from "../hooks/getError"

export default class BaseModel<Schema>
{
    protected data: Partial<Schema>

    protected readonly validationScenarios: ValidationScenarios<Schema>

    protected readonly modelErrors: ModelErrors<Schema>

    public constructor(data: Partial<Schema> = {})
    {
        this.data = data
        this.validationScenarios = new ValidationScenarios(this.validation())
        this.modelErrors = new ModelErrors
    }

    public async validate(): Promise<boolean>
    {
        for (const attribute of this.validationScenarios.getScenariosProperties()) {
            for (const scenario of this.validationScenarios.getScenarios(attribute)) {
                try {
                    await scenario.make(this, attribute)
                }
                catch (errorMessage) {
                    this.modelErrors.appendError(attribute, getError(errorMessage))
                }
            }
        }
        return this.isValid
    }

    public validation(): Scenarios<Schema>
    {
        return {}
    }

    public get attributes(): Partial<Schema>
    {
        return this.data
    }

    public set attributes(data: Partial<Schema>)
    {
        this.data = data
    }

    public get scenarios(): ValidationScenarios<Schema>
    {
        return this.validationScenarios
    }

    public get errors(): ModelErrors<Schema>
    {
        return this.modelErrors
    }

    public get isValid(): boolean
    {
        return !this.errors.hasErrors()
    }
}