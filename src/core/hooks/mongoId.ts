import { ObjectId } from "mongodb";
import { ModelID } from "../data/types/ModelID"

export default function mongoId(id: ModelID): ObjectId | undefined
{
    if (id instanceof ObjectId) {
        return id
    }
    else if (["number", "string"].includes(typeof id)) {
        return new ObjectId(id)
    }
    return undefined
}