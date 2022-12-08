import CollectionDocumentWriter from "../../../components/database/collections/CollectionDocumentWriter"
import ModelSchema from "../../../data/interfaces/ModelSchema"
import MethodModel from "../../../foundations/MethodModel"
import Model from "../../../Model"

export default class SetupOriginals<Schema extends ModelSchema> extends MethodModel<CollectionDocumentWriter<Schema>, Promise<boolean>, [Model<Schema>]>
{
    public async method(model: Model<Schema>): Promise<boolean>
    {
        if (!await this.original(model)) {
            return false
        }
        
        for (const attribute in model.attributes) {
            model.originalAttributes[attribute] = model.attributes[attribute]
        }

        return true
    }
}