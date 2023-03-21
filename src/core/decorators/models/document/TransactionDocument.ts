import ModelSchema from "@data/interfaces/ModelSchema"

import CollectionDocument from "@foundations/CollectionDocument"
import MethodModel from "@foundations/MethodModel"

import Model from "@core/Model"


export default class TransactionDocument<Schema extends ModelSchema> extends MethodModel<Model<Schema>, CollectionDocument>
{
    public method(this: Model<Schema>, { original }: TransactionDocument<Schema>): CollectionDocument
    {
        return original().withSession(this.transaction)
    }
}