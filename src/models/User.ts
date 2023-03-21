/* eslint-disable @typescript-eslint/no-unused-vars */
import ModelSchema from "@data/interfaces/ModelSchema"
import UserInterface from "@data/interfaces/UserInterface"
import { Scenarios } from "@data/interfaces/Scenarios"
import { Alg } from "@data/enums/Alg"
import { Nullable } from "@data/types/Nullable"
import type { Attr } from "@data/types/Attr"

import Repository from "@foundations/Repository"
import { ValidationData } from "@foundations/Validation"
import Hash from "@helpers/Hash"
import ModelSignature from "@decorators/signatures/ModelSignature"
import ModelTimestamps from "@decorators/ModelTimestamps"
import Attribute from "@decorators/Attribute"
import Default from "@decorators/Default"

import merge from "@hooks/merge"

import Model from "@core/Model"

import HashAttribute from "@scenarios/HashAttribute"

import BooleanValidation, { BooleanValidationData } from "@validators/core/BooleanValidation"
import DateValidation from "@validators/core/DateValidation"
import UsernameValidation from "@validators/UsernameValidation"
import EmailValidation from "@validators/EmailValidation"
import PasswordValidation from "@validators/PasswordValidation"
import ConsentsTermsValidation from "@validators/ConsentsTermsValidation"

import UserRepository from "@repositories/UserRepository"
import avatar from "@core/hooks/avatar"


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

    public getRepository(): Repository<UserSchema, User>
    {
        return new UserRepository
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

    public checkPassword(password: string): boolean
    {
        return this.original.password ? Hash.compare(password, this.original.password.hash) : false
    }

    public getInterface(): Nullable<UserInterface>
    {
        const { _id, user } = this
        
        if (_id && user) {
            const id = _id.toString()
            const avatarURL = avatar(id)
            
            if (avatarURL) {
                return {
                    type: "standard",
                    id,
                    username: user.name,
                    email: user.email,
                    avatar: avatarURL
                }
            }
        }
        return null
    }
}