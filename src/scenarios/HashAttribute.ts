import { Alg } from "../core/data/enums/Alg"
import Scenario from "../core/data/interfaces/Scenario"
import { Keyof } from "../core/data/types/Keyof"
import { Valueof } from "../core/data/types/Valueof"
import BaseModel from "../core/foundations/BaseModel"
import Hash from "../core/helpers/Hash"
import NeastedObjectHelper from "../core/helpers/NeastedObjectHelper"

export default class HashAttribute<Schema> implements Scenario<Schema>
{
    protected readonly algorithm: Alg | undefined

    public constructor(algorithm?: Alg)
    {
        this.algorithm = algorithm
    }

    public make<Key extends Keyof<Schema>>(model: BaseModel<Schema>, attribute: Key): void
    {
        const helper = new NeastedObjectHelper(<Schema> model.attributes)
        if (helper.get(attribute) && typeof helper.get(attribute) === "string") {
            const hash = Hash.create(<string> helper.get(attribute), this.algorithm)
            model.attributes = helper.set(attribute, <Valueof<Schema, Key>> hash).result
        }
    }
}