/* eslint-disable @typescript-eslint/no-unused-vars */
import Scenario from "../data/interfaces/Scenario"
import { Scenarios } from "../data/interfaces/Scenarios"
import { Constructor } from "../data/types/Constructor"
import CreateIfNotExists from "../decorators/models/scenarios/CreateIfNotExists"
import Method from "../helpers/Method"

export default class ValidationScenarios<Schema>
{
    protected scenarios: Scenarios<Schema>

    public constructor(scenarios: Scenarios<Schema> = {})
    {
        this.scenarios = scenarios
    }

    public getAllScenarios(): Scenarios<Schema>
    {
        return this.scenarios
    }

    public getScenarios(attribute: keyof Schema): Array<Scenario<Schema>>
    {
        return this.scenarios[attribute] || []
    }

    public getScenariosProperties(): Array<keyof Schema>
    {
        return Object.keys(this.scenarios).map(key => <keyof Schema> key)
    }

    @Method(<Constructor<CreateIfNotExists<Schema>>> CreateIfNotExists)
    public addScenario(attribute: keyof Schema, validation: Scenario<Schema>): this
    {
        this.scenarios[attribute]?.push(validation)
        return this
    }

    public set modelScenarios(scenarios: Scenarios<Schema>)
    {
        this.scenarios = scenarios
    }
}