import ModelSchema from "@data/interfaces/ModelSchema"
import { ModelConstructor } from "@data/types/ModelContructor"
import { ModelID } from "@data/types/ModelID"
import { TransactionData } from "@data/types/TransactionData"
import QueryCallback from "@data/callbacks/QueryCallback"
import { Nullable } from "@data/types/Nullable"

import findModel from "@hooks/findModel"
import findModelByQuery from "@hooks/findModelByQuery"
import findAllModelsByQuery from "@hooks/findAllModelsByQuery"
import deleteModels from "@hooks/deleteModels"

import Model from "@core/Model"


export default abstract class Repository<Schema extends ModelSchema, Target extends Model<Schema>>
{
    public abstract getModel(): ModelConstructor<Schema, Target>

    public find(id: ModelID, transaction?: TransactionData): Promise<Nullable<Target>>
    {
        return findModel(this.getModel(), id, transaction)
    }

    public query(callback: QueryCallback<Schema>, transaction?: TransactionData): Promise<Nullable<Target>>
    {
        return findModelByQuery(this.getModel(), callback, transaction)
    }

    public queryAll(callback: QueryCallback<Schema>, transaction?: TransactionData): Promise<Array<Target>>
    {
        return findAllModelsByQuery(this.getModel(), callback, transaction)
    }

    public deleteAll(callback: QueryCallback<Schema>, transaction?: TransactionData): Promise<number>
    {
        return deleteModels(this.getModel(), callback, transaction)
    }
}