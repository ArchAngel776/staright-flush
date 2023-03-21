import Scenario from "@data/interfaces/Scenario"
import { Keyof } from "@data/types/Keyof"
import { Valueof } from "@data/types/Valueof"
import { Alg } from "@data/enums/Alg"

import BaseModel from "@foundations/BaseModel"
import Hash from "@helpers/Hash"
import NeastedObjectHelper from "@helpers/NeastedObjectHelper"


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
        const valueToHash = helper.get(attribute)
        
        if (valueToHash && typeof valueToHash === "string") {
            const hash = Hash.create(valueToHash, this.algorithm)
            model.attributes = helper.set(attribute, <Valueof<Schema, Key>> hash).result
        }
    }
}