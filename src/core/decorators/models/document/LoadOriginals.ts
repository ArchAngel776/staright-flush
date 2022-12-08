import CollectionDocumentReader from "../../../components/database/collections/CollectionDocumentReader"
import ModelSchema from "../../../data/interfaces/ModelSchema"
import { Nullable } from "../../../data/types/Nullable"
import MethodModel from "../../../foundations/MethodModel"
import Model from "../../../Model"

export default class LoadOriginals<Schema extends ModelSchema> extends MethodModel<CollectionDocumentReader<Schema>, Promise<Nullable<Model<Schema>>>, [Model<Schema>]>
{
    public async method(model: Model<Schema>): Promise<Nullable<Model<Schema>>>
    {
        const result = await this.original(model)

        if (!result) {
            return null
        }

        for (const attribute in result.attributes) {
            result.originalAttributes[attribute] = result.attributes[attribute]
        }

        return result
    }
}