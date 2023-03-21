import ModelSchema from "@data/interfaces/ModelSchema"
import { Nullable } from "@data/types/Nullable"

import MethodModel from "@foundations/MethodModel"
import CollectionDocumentReader from "@components/database/collections/CollectionDocumentReader"

import clone from "@hooks/clone"

import Model from "@core/Model"


export default class LoadOriginals<Schema extends ModelSchema> extends MethodModel<CollectionDocumentReader<Schema>, Promise<Nullable<Model<Schema>>>, [model: Model<Schema>]>
{
    public async method(this: CollectionDocumentReader<Schema>, { original }: LoadOriginals<Schema>, model: Model<Schema>): Promise<Nullable<Model<Schema>>>
    {
        const result = await original(model)

        if (!result) {
            return null
        }

        for (const attribute in result.attributes) {
            result.originalAttributes[attribute] = clone(result.attributes[attribute])
        }

        return result
    }
}