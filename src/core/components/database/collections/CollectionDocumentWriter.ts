/* eslint-disable @typescript-eslint/no-unused-vars */
import { Filter, FindOneAndUpdateOptions, MatchKeysAndValues, ObjectId, ReturnDocument, UpdateFilter } from "mongodb"

import ModelSchema from "@data/interfaces/ModelSchema"
import { Constructor } from "@data/types/Constructor"
import { Attr } from "@data/types/Attr"

import CollectionDocument from "@foundations/CollectionDocument"
import Method from "@helpers/Method"
import SetupOriginals from "@decorators/models/document/SetupOriginals"
import FilterOriginals from "@decorators/models/document/FilterOriginals"

import merge from "@hooks/merge"

import Model from "@core/Model"


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
        const { value } = await this.make(database => database.collection<Schema>(model.collection()).findOneAndUpdate(
            this.findFilter(model.attributes._id), this.data(model.attributes), this.getOptions()
        ))

        if (value) {
            model.attributes = value
            return true
        }

        return false
    }

    protected getOptions(): FindOneAndUpdateOptions
    {
        return merge(super.getOptions(), {
            upsert: true,
            returnDocument: ReturnDocument.AFTER
        })
    }
}