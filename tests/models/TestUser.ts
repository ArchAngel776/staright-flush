import QueryCallback from "@data/callbacks/QueryCallback"
import { TransactionData } from "@data/types/TransactionData"
import { ModelID } from "@data/types/ModelID"
import { Nullable } from "@data/types/Nullable"

import findModel from "@hooks/findModel"
import findModelByQuery from "@hooks/findModelByQuery"
import findAllModelsByQuery from "@hooks/findAllModelsByQuery"
import deleteModels from "@hooks/deleteModels"

import User, { UserSchema } from "@models/User"


export default class TestUser extends User
{
    public collection(): string
    {
        return "test_users"
    }

    public getModel(): typeof TestUser
    {
        return TestUser
    }

    public static find(id: ModelID, transaction?: TransactionData): Promise<Nullable<TestUser>>
    {
        return findModel(TestUser, id, transaction)
    }

    public static query(callback: QueryCallback<UserSchema>, transaction?: TransactionData): Promise<Nullable<TestUser>>
    {
        return findModelByQuery(TestUser, callback, transaction)
    }

    public static queryAll(callback: QueryCallback<UserSchema>, transaction?: TransactionData): Promise<Array<TestUser>>
    {
        return findAllModelsByQuery(TestUser, callback, transaction)
    }

    public static deleteAll(callback: QueryCallback<UserSchema>, transaction?: TransactionData): Promise<number>
    {
        return deleteModels(TestUser, callback, transaction)
    }
}