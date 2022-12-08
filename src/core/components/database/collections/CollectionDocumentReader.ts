/* eslint-disable @typescript-eslint/no-unused-vars */
import { Filter } from "mongodb"
import Model from "../../../Model"
import ModelSchema from "../../../data/interfaces/ModelSchema"
import Connection from "../Connection"
import { Nullable } from "../../../data/types/Nullable"
import Method from "../../../helpers/Method"
import LoadOriginals from "../../../decorators/models/document/LoadOriginals"
import { Constructor } from "../../../data/types/Constructor"

export default class CollectionDocumentReader<Schema extends ModelSchema>
{
    protected connection: Connection

    protected filter: Filter<Schema>

    public constructor()
    {
        this.connection = Connection.getConnection()
        this.filter = {}
    }

    public where(filter: Filter<Schema>): this
    {
        this.filter = filter
        return this
    }

    @Method(<Constructor<LoadOriginals<Schema>>> LoadOriginals)
    public async findDocument(model: Model<Schema>): Promise<Nullable<Model<Schema>>>
    {
        const result = await this.connection.make(database => database.collection<Schema>(model.collection()).findOne(this.filter))

        if (!result) {
            return null
        }

        model.attributes = <Schema> result
        return model   
    }
}