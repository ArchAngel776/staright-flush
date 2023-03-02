import CollectionDocumentReader from "../../../components/database/collections/CollectionDocumentReader"
import ModelSchema from "../../../data/interfaces/ModelSchema"
import { Nullable } from "../../../data/types/Nullable"
import MethodModel from "../../../foundations/MethodModel"
import clone from "../../../hooks/clone"
import Model from "../../../Model"

export default class LoadOriginals<Schema extends ModelSchema> extends MethodModel<CollectionDocumentReader<Schema>, Promise<Nullable<Model<Schema>>>, [model: Model<Schema>]>
{
    public async method(this: CollectionDocumentReader<Schema>, { original }: LoadOriginals<Schema>, model: Model<Schema>): Promise<Nullable<Model<Schema>>>
    {
        const result = await original(model)

        if (!result) {
            return null
        }

        for (const attribute in model.attributes) {
            result.originalAttributes[attribute] = clone(model.attributes[attribute])
        }

        return result
    }
}