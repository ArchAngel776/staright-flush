import CollectionDocumentReader from "../../../components/database/collections/CollectionDocumentReader"
import ModelSchema from "../../../data/interfaces/ModelSchema"
import MethodModel from "../../../foundations/MethodModel"
import clone from "../../../hooks/clone"
import Model from "../../../Model"

export default class LoadAllOriginals<Schema extends ModelSchema> extends MethodModel<CollectionDocumentReader<Schema>, Promise<Array<Model<Schema>>>, [model: Model<Schema>]>
{
    public async method(this: CollectionDocumentReader<Schema>, { original, loadOriginals }: LoadAllOriginals<Schema>, model: Model<Schema>): Promise<Array<Model<Schema>>>
    {
        const results = await original(model)
        return results.map(loadOriginals)
    }

    public loadOriginals(model: Model<Schema>): Model<Schema>
    {
        for (const attribute in model.attributes) {
            model.originalAttributes[attribute] = clone(model.attributes[attribute])
        }
        return model
    }
}