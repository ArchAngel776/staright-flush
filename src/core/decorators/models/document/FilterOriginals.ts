import ModelSchema from "@data/interfaces/ModelSchema"

import MethodModel from "@foundations/MethodModel"
import CollectionDocumentWriter from "@components/database/collections/CollectionDocumentWriter"

import Model from "@core/Model"


export default class FilterOriginals<Schema extends ModelSchema> extends MethodModel<CollectionDocumentWriter<Schema>, Promise<boolean>, [model: Model<Schema>]>
{
    public method(this: CollectionDocumentWriter<Schema>, { original, withID }: FilterOriginals<Schema>, model: Model<Schema>): Promise<boolean>
    {
        for (const attribute in model.originalAttributes) {
            if (model.originalAttributes[attribute] === model.attributes[attribute]) {
                delete model.attributes[attribute]
            }
        }
        return original(withID(model))
    }

    public withID(model: Model<Schema>): Model<Schema>
    {
        if (model.originalAttributes._id) {
            model.attributes._id = model.originalAttributes._id
        }
        return model
    }
}