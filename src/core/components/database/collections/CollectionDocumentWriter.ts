/* eslint-disable @typescript-eslint/no-unused-vars */
import { Filter, FindOneAndUpdateOptions, ObjectId, UpdateFilter } from "mongodb"
import Connection from "../Connection"
import ModelSchema from "../../../data/interfaces/ModelSchema"
import Model from "../../../Model"
import { Attr } from "../../../data/types/Attr"
import Method from "../../../helpers/Method"
import SetupOriginals from "../../../decorators/models/document/SetupOriginals"
import { Constructor } from "../../../data/types/Constructor"
import FilterOriginals from "../../../decorators/models/document/FilterOriginals"

export default class CollectionDocumentWriter<Schema extends ModelSchema>
{
    protected connection: Connection

    public constructor()
    {
        this.connection = Connection.getConnection()
    }

    protected findFilter(_id: Attr<ObjectId>): Filter<Schema>
    {
        return { _id } as Filter<Schema>
    }

    protected data(data: Partial<Schema>): UpdateFilter<Schema>
    {
        return { $set: data as Schema }
    }

    protected options(): FindOneAndUpdateOptions
    {
        return { upsert: true, returnDocument: "after" }
    }

    @Method(<Constructor<SetupOriginals<Schema>>> SetupOriginals)
    @Method(<Constructor<FilterOriginals<Schema>>> FilterOriginals)
    public async saveDocument(model: Model<Schema>): Promise<boolean>
    {
        const { value } = await this.connection.make(database => database.collection<Schema>(model.collection()).findOneAndUpdate(
            this.findFilter(model.attributes._id), this.data(model.attributes), this.options()
        ))

        if (!value) {
            return false
        }

        model.attributes = <Schema> value
        return true
    }
}