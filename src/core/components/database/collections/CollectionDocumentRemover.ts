import { Filter, ObjectId } from "mongodb"
import ModelSchema from "../../../data/interfaces/ModelSchema"
import { Attr } from "../../../data/types/Attr"
import CollectionDocument from "../../../foundations/CollectionDocument"
import Model from "../../../Model"

export default class CollectionDocumentRemover<Schema extends ModelSchema> extends CollectionDocument
{
    protected findFilter(_id: Attr<ObjectId>): Filter<Schema>
    {
        return <Filter<Schema>> { _id }
    }

    public async removeDocument<Target extends Model<Schema>>(model: Target): Promise<boolean>
    {
        const { deletedCount } = await this.connection.make(database => database.collection<Schema>(model.collection()).deleteOne(
            this.findFilter(model.attributes._id), this.getOptions()
        ))
        return deletedCount > 0
    }
}