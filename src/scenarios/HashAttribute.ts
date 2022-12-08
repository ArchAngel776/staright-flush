import { Alg } from "../core/data/enums/Alg"
import Scenario from "../core/data/interfaces/Scenario"
import BaseModel from "../core/foundations/BaseModel"
import Hash from "../core/helpers/Hash"
import cast from "../core/hooks/cast"

export default class HashAttribute<Schema> implements Scenario<Schema>
{
    protected readonly algorithm: Alg | undefined

    public constructor(algorithm?: Alg)
    {
        this.algorithm = algorithm
    }

    public make(model: BaseModel<Schema>, attribute: keyof Schema): void
    {
        if (model.attributes[attribute] && typeof model.attributes[attribute] === "string") {
            const hash = Hash.create(cast(model.attributes[attribute]), this.algorithm)
            model.attributes[attribute] = cast(hash)
        }
    }
}