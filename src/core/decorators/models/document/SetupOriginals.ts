import ModelSchema from "@data/interfaces/ModelSchema"

import MethodModel from "@foundations/MethodModel"
import CollectionDocumentWriter from "@components/database/collections/CollectionDocumentWriter"

import clone from "@hooks/clone"

import Model from "@core/Model"


export default class SetupOriginals<Schema extends ModelSchema> extends MethodModel<CollectionDocumentWriter<Schema>, Promise<boolean>, [model: Model<Schema>]>
{
    public async method(this: CollectionDocumentWriter<Schema>, { original }: SetupOriginals<Schema>, model: Model<Schema>): Promise<boolean>
    {
        if (!await original(model)) {
            return false
        }
        
        for (const attribute in model.attributes) {
            model.originalAttributes[attribute] = clone(model.attributes[attribute])
        }

        return true
    }
}