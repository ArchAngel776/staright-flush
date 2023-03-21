/* eslint-disable @typescript-eslint/no-unused-vars */
import { Filter, FindOptions } from "mongodb"

import ModelSchema from "@data/interfaces/ModelSchema"
import { Nullable } from "@data/types/Nullable"
import { Constructor } from "@data/types/Constructor"
import { ModelConstructor } from "@data/types/ModelContructor"
import { ProjectionData } from "@data/types/ProjectionData"

import CollectionDocument from "@foundations/CollectionDocument"
import Method from "@helpers/Method"
import LoadOriginals from "@decorators/models/document/LoadOriginals"
import LoadAllOriginals from "@decorators/models/document/LoadAllOriginals"

import merge from "@hooks/merge"

import Model from "@core/Model"


export default class CollectionDocumentReader<Schema extends ModelSchema> extends CollectionDocument
{
    protected project: ProjectionData<Schema>

    protected filter: Filter<Schema>

    public constructor()
    {
        super()
        this.project = {}
        this.filter = {}
    }

    public select(project: ProjectionData<Schema>): this
    {
        this.project = project
        return this
    }

    public where(filter: Filter<Schema>): this
    {
        this.filter = filter
        return this
    }

    @Method(<Constructor<LoadOriginals<Schema>>> LoadOriginals)
    public async findDocument<Target extends Model<Schema>>(model: Target): Promise<Nullable<Target>>
    {
        const result = await this.make(database => database.collection<Schema>(model.collection()).findOne(this.filter, this.getOptions()))

        if (result) {
            const Model = <ModelConstructor<Schema, Target>> model.getRepository().getModel()
            return new Model(result)
        }

        return null
    }

    @Method(<Constructor<LoadAllOriginals<Schema>>> LoadAllOriginals)
    public async findDocuments<Target extends Model<Schema>>(model: Target): Promise<Array<Target>>
    {
        const result = await this.make(database => database.collection<Schema>(model.collection()).find(this.filter, this.getOptions()).toArray())

        const Model = <ModelConstructor<Schema, Target>> model.getRepository().getModel()
        return result.map(attributes => new Model(attributes))
    }

    protected getOptions(): FindOptions<Schema>
    {
        return merge(super.getOptions(), {
            projection: this.project
        })
    }
}