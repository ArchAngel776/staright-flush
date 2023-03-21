import { RegisterRequestData } from "../../@types/request/RegisterRequestData"

import FilesValidation from "@data/interfaces/FilesValidation"
import { Scenarios } from "@data/interfaces/Scenarios"
import { MimeType } from "@data/enums/MimeType"

import RequestWithFiles from "@foundations/RequestWithFiles"
import Unique from "@helpers/Unique"

import User from "@models/User"

import StringValidation, { StringValidationData } from "@validators/core/StringValidation"
import EmailValidation from "@validators/EmailValidation"
import PasswordValidation from "@validators/PasswordValidation"
import UsernameValidation from "@validators/UsernameValidation"
import ImageValidation from "@validators/ImageValidation"


export default class RegisterRequest extends RequestWithFiles<RegisterRequestData>
{
    public validation(): Scenarios<RegisterRequestData>
    {
        return {
            username:           new UsernameValidation({ unique: this.uniqueUsername }),
            email:              new EmailValidation({ unique: this.uniqueEmail }),
            password:           new PasswordValidation,
            confirmPassword:    new StringValidation({ sameAs: "password" }),
            acceptTerms:        new StringValidation(this.acceptTermsOptions)
        }
    }
    
    public files(): FilesValidation
    {
        return {
            avatar: new ImageValidation({
                required: true,
                multipleFiles: false,
                type: [MimeType.PNG, MimeType.JPG, MimeType.GIF, MimeType.WEBP],
                ratio: "1x1",
                maxSize: {
                    width: 512,
                    height: 512
                }
            })
        }
    }

    protected get uniqueUsername(): Unique
    {
        return Unique.collection(User, "user.name")
    }

    protected get uniqueEmail(): Unique
    {
        return Unique.collection(User, "user.email")
    }

    protected get acceptTermsOptions(): Partial<StringValidationData<RegisterRequestData>>
    {
        return {
            required: true,
            pattern: /^on$/
        }
    }
}