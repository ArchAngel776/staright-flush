import CollectionDocumentWriter from "../../../components/database/collections/CollectionDocumentWriter"
import ModelSchema from "../../../data/interfaces/ModelSchema"
import MethodModel from "../../../foundations/MethodModel"
import Model from "../../../Model"

export default class FilterOriginals<Schema extends ModelSchema> extends MethodModel<CollectionDocumentWriter<Schema>, Promise<boolean>, [Model<Schema>]>
{
    public method(model: Model<Schema>): Promise<boolean>
    {
        for (const attribute in model.originalAttributes) {
            if (model.originalAttributes[attribute] === model.attributes[attribute]) {
                delete model.attributes[attribute]
            }
        }
        return this.original(this.withID(model))
    }

    protected withID(model: Model<Schema>): Model<Schema>
    {
        if (model.originalAttributes._id) {
            model.attributes._id = model.originalAttributes._id
        }
        return model
    }
}