import Scenario from "./Scenario"

export type Scenarios<Schema> = {
    [property in keyof Schema]?: Array<Scenario<Schema>>
}