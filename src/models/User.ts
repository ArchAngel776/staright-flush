/* eslint-disable @typescript-eslint/no-unused-vars */
import ModelSchema from "@data/interfaces/ModelSchema"
import QueryCallback from "@data/callbacks/QueryCallback"
import { TransactionData } from "@data/types/TransactionData"
import { Scenarios } from "@data/interfaces/Scenarios"
import { Alg } from "@data/enums/Alg"
import { ModelID } from "@data/types/ModelID"
import { Nullable } from "@data/types/Nullable"
import type { Attr } from "@data/types/Attr"

import { ValidationData } from "@foundations/Validation"
import ModelTimestamps from "@decorators/ModelTimestamps"
import Attribute from "@decorators/Attribute"
import Default from "@decorators/Default"
import ModelSignature from "@decorators/signatures/ModelSignature"

import merge from "@hooks/merge"
import findModel from "@hooks/findModel"
import findModelByQuery from "@hooks/findModelByQuery"
import findAllModelsByQuery from "@hooks/findAllModelsByQuery"
import deleteModels from "@hooks/deleteModels"

import Model from "@core/Model"

import HashAttribute from "@scenarios/HashAttribute"

import BooleanValidation, { BooleanValidationData } from "@validators/core/BooleanValidation"
import DateValidation from "@validators/core/DateValidation"
import UsernameValidation from "@validators/UsernameValidation"
import EmailValidation from "@validators/EmailValidation"
import PasswordValidation from "@validators/PasswordValidation"
import ConsentsTermsValidation from "@validators/ConsentsTermsValidation"


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
    consents: {
        terms: "on" | "off"
    },
    timestamps: {
        created_at: Date
        updated_at: Date
    }
}

@ModelTimestamps<UserSchema>("timestamps.created_at", "timestamps.updated_at")
@ModelSignature<UserSchema>()
export default class User extends Model<UserSchema>
{
    @Attribute<UserSchema, ValidationData<UserSchema>>()
    user: Attr<UserSchema["user"]>

    @Default<UserSchema>(true)
    @Attribute<UserSchema, BooleanValidationData<UserSchema>>(BooleanValidation, { required: true })
    active: Attr<boolean>

    @Attribute<UserSchema, ValidationData<UserSchema>>()
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
            "user.name": new UsernameValidation({ unique: true }),
            "user.email": new EmailValidation({ unique: true }),
            "password.hash": [
                new PasswordValidation,
                new HashAttribute(Alg.SHA256)
            ],
            "consents.terms": new ConsentsTermsValidation,
            "timestamps.created_at": new DateValidation,
            "timestamps.updated_at": new DateValidation
        })
    }

    public static find(id: ModelID, transaction?: TransactionData): Promise<Nullable<User>>
    {
        return findModel(User, id, transaction)
    }

    public static query(callback: QueryCallback<UserSchema>, transaction?: TransactionData): Promise<Nullable<User>>
    {
        return findModelByQuery(User, callback, transaction)
    }

    public static queryAll(callback: QueryCallback<UserSchema>, transaction?: TransactionData): Promise<Array<User>>
    {
        return findAllModelsByQuery(User, callback, transaction)
    }

    public static deleteAll(callback: QueryCallback<UserSchema>, transaction?: TransactionData): Promise<number>
    {
        return deleteModels(User, callback, transaction)
    }
}