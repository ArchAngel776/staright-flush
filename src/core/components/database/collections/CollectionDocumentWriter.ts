/* eslint-disable @typescript-eslint/no-unused-vars */
import { Filter, FindOneAndUpdateOptions, MatchKeysAndValues, ObjectId, ReturnDocument, UpdateFilter } from "mongodb"
import ModelSchema from "../../../data/interfaces/ModelSchema"
import Model from "../../../Model"
import { Attr } from "../../../data/types/Attr"
import Method from "../../../helpers/Method"
import SetupOriginals from "../../../decorators/models/document/SetupOriginals"
import { Constructor } from "../../../data/types/Constructor"
import FilterOriginals from "../../../decorators/models/document/FilterOriginals"
import CollectionDocument from "../../../foundations/CollectionDocument"

export default class CollectionDocumentWriter<Schema extends ModelSchema> extends CollectionDocument
{
    protected findFilter(_id: Attr<ObjectId>): Filter<Schema>
    {
        return <Filter<Schema>> { _id }
    }

    protected data(data: Partial<Schema>): UpdateFilter<Schema>
    {
        return { $set: data as MatchKeysAndValues<Schema> }
    }

    @Method(<Constructor<SetupOriginals<Schema>>> SetupOriginals)
    @Method(<Constructor<FilterOriginals<Schema>>> FilterOriginals)
    public async saveDocument(model: Model<Schema>): Promise<boolean>
    {
        const { value } = await this.connection.make(database => database.collection<Schema>(model.collection()).findOneAndUpdate(
            this.findFilter(model.attributes._id), this.data(model.attributes), this.getOptions()
        ))

        if (!value) {
            return false
        }

        model.attributes = <Schema> value
        return true
    }

    protected getOptions(): FindOneAndUpdateOptions
    {
        const options: FindOneAndUpdateOptions = super.getOptions()
        options.upsert = true
        options.returnDocument = ReturnDocument.AFTER
        return options
    }
}