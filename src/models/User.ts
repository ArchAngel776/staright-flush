/* eslint-disable @typescript-eslint/no-unused-vars */
import Model from "../core/Model"
import ModelSchema from "../core/data/interfaces/ModelSchema"
import { ModelID } from "../core/data/types/ModelID"
import { Nullable } from "../core/data/types/Nullable"
import ModelTimestamps from "../core/decorators/ModelTimestamps"
import Attribute from "../core/decorators/Attribute"
import { Attr } from "../core/data/types/Attr"
import findModel from "../core/hooks/findModel"
import Default from "../core/decorators/Default"
import { StringValidationData } from "../validators/core/StringValidation"
import BooleanValidation, { BooleanValidationData } from "../validators/core/BooleanValidation"
import DateValidation, { DateValidationData } from "../validators/core/DateValidation"
import UsernameValidation from "../validators/UsernameValidation"
import EmailValidation from "../validators/EmailValidation"
import ModelSignature from "../core/decorators/ModelSignature"
import { Scenarios } from "../core/data/interfaces/Scenarios"
import merge from "../core/hooks/merge"
import PasswordValidation from "../validators/PasswordValidation"
import HashAttribute from "../scenarios/HashAttribute"
import { Alg } from "../core/data/enums/Alg"

export interface UserSchema extends ModelSchema
{
    username: string
    email: string
    password_hash: string
    active: boolean
    created_at: Date
    updated_at: Date
}

@ModelTimestamps<UserSchema>("created_at", "updated_at")
@ModelSignature<UserSchema>()
export default class User extends Model<UserSchema>
{
    @Attribute<UserSchema, StringValidationData>(UsernameValidation)
    username: Attr<string>

    @Attribute<UserSchema, StringValidationData>(EmailValidation, { unique: true })
    email: Attr<string>

    @Default(true)
    @Attribute<UserSchema, BooleanValidationData>(BooleanValidation)
    active: Attr<boolean>

    @Attribute<UserSchema, DateValidationData>(DateValidation)
    created_at: Attr<Date>

    @Attribute<UserSchema, DateValidationData>(DateValidation)
    updated_at: Attr<Date>

    public collection(): string
    {
        return "users"
    }

    public validation(): Scenarios<UserSchema>
    {
        return merge(super.validation(), {
            password_hash: [
                new PasswordValidation,
                new HashAttribute(Alg.SHA256)
            ]
        })
    }

    public static find(id: ModelID): Promise<Nullable<User>>
    {
        return findModel(User, id)
    }
}