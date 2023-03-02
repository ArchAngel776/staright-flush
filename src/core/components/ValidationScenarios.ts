/* eslint-disable @typescript-eslint/no-unused-vars */
import Scenario from "../data/interfaces/Scenario"
import { Scenarios } from "../data/interfaces/Scenarios"
import { Constructor } from "../data/types/Constructor"
import { Keyof } from "../data/types/Keyof"
import CreateIfNotExists from "../decorators/models/scenarios/CreateIfNotExists"
import Method from "../helpers/Method"
import multi from "../hooks/multi"

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

    public getScenarios(attribute: Keyof<Schema>): Array<Scenario<Schema>>
    {
        return multi(this.scenarios[attribute] || []) 
    }

    public getScenariosProperties(): Array<Keyof<Schema>>
    {
        return Object.keys(this.scenarios).map(key => <Keyof<Schema>> key)
    }

    @Method(<Constructor<CreateIfNotExists<Schema>>> CreateIfNotExists)
    public addScenario(attribute: Keyof<Schema>, validation: Scenario<Schema>): this
    {
        const scenario = this.getScenarios(attribute)
        this.scenarios[attribute] = scenario.splice(scenario.length, 0, validation)
        return this
    }

    public set modelScenarios(scenarios: Scenarios<Schema>)
    {
        this.scenarios = scenarios
    }
}