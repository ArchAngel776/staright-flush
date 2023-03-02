/* eslint-disable @typescript-eslint/no-unused-vars */
import Model from "../core/Model"
import ModelSchema from "../core/data/interfaces/ModelSchema"
import ModelTimestamps from "../core/decorators/ModelTimestamps"
import Attribute from "../core/decorators/Attribute"
import { Attr } from "../core/data/types/Attr"
import Default from "../core/decorators/Default"
import BooleanValidation, { BooleanValidationData } from "../validators/core/BooleanValidation"
import DateValidation from "../validators/core/DateValidation"
import UsernameValidation from "../validators/UsernameValidation"
import EmailValidation from "../validators/EmailValidation"
import ModelSignature from "../core/decorators/ModelSignature"
import { Scenarios } from "../core/data/interfaces/Scenarios"
import merge from "../core/hooks/merge"
import PasswordValidation from "../validators/PasswordValidation"
import HashAttribute from "../scenarios/HashAttribute"
import { Alg } from "../core/data/enums/Alg"
import { ValidationData } from "../core/foundations/Validation"
import { ModelID } from "../core/data/types/ModelID"
import { Nullable } from "../core/data/types/Nullable"
import findModel from "../core/hooks/findModel"
import QueryCallback from "../core/data/callbacks/QueryCallback"
import findModelByQuery from "../core/hooks/findModelByQuery"
import findAllModelsByQuery from "../core/hooks/findAllModelsByQuery"
import deleteModels from "../core/hooks/deleteModels"

export interface UserSchema extends ModelSchema
{
    user: {
        name: string
        email: string
    }
    password: {
        hash: string
    }
    active: boolean
    timestamps: {
        created_at: Date
        updated_at: Date
    }
}

@ModelTimestamps<UserSchema>("timestamps.created_at", "timestamps.updated_at")
@ModelSignature<UserSchema>()
export default class User extends Model<UserSchema>
{
    @Attribute<UserSchema, ValidationData>()
    user: Attr<UserSchema["user"]>

    @Default<UserSchema>(true)
    @Attribute<UserSchema, BooleanValidationData>(BooleanValidation, { required: true })
    active: Attr<boolean>

    @Attribute<UserSchema, ValidationData>()
    timestamps: Attr<UserSchema["timestamps"]>

    public collection(): string
    {
        return "users"
    }

    public getModel(): typeof User
    {
        return User
    }

    public validation(): Scenarios<UserSchema>
    {
        return merge(super.validation(), {
            "user.name": new UsernameValidation,
            "user.email": new EmailValidation({ unique: true }),
            "password.hash": [
                new PasswordValidation,
                new HashAttribute(Alg.SHA256)
            ],
            "timestamps.created_at": new DateValidation,
            "timestamps.updated_at": new DateValidation
        })
    }

    public static find(id: ModelID): Promise<Nullable<User>>
    {
        return findModel(User, id)
    }

    public static query(callback: QueryCallback<UserSchema>): Promise<Nullable<User>>
    {
        return findModelByQuery(User, callback)
    }

    public static queryAll(callback: QueryCallback<UserSchema>): Promise<Array<User>>
    {
        return findAllModelsByQuery(User, callback)
    }

    public static deleteAll(callback: QueryCallback<UserSchema>): Promise<number>
    {
        return deleteModels(User, callback)
    }
}