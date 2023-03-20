import { RegisterRequestData } from "../../@types/request/RegisterRequestData"
import { RegisterResponseData } from "../../@types/response/RegisterResponseData"

import { resolve, extname } from "path"
import { Request } from "express"

import Observer from "@data/interfaces/Observer"
import { MimeType } from "@data/enums/MimeType"
import { ModelEvent } from "@data/enums/ModelEvent"
import type ResponseInterface from "@data/interfaces/ResponseInterface"

import Connection from "@components/database/Connection"
import Method from "@helpers/Method"
import ContentType, { CT } from "@decorators/actions/ContentType"

import root from "@hooks/root"

import Action from "@core/Action"

import AfterSaveEvent from "@events/AfterSaveEvent"
import User, { UserSchema } from "@models/User"
import SingleRequestFileException from "@exceptions/SingleRequestFileException"


export default class RegisterAction extends Action<RegisterRequestData, RegisterResponseData> implements Observer<AfterSaveEvent<UserSchema>>
{
    protected readonly connection: Connection

    public constructor(request: Request)
    {
        super(request)
        this.connection = Connection.getConnection()
    }

    @Method(<CT<RegisterRequestData, RegisterResponseData>> ContentType, MimeType.JSON)
    public async make(response: ResponseInterface<RegisterResponseData>): Promise<ResponseInterface<RegisterResponseData>>
    {
        const { username, email, password, acceptTerms } = this.data

        const user = new User({
            user: {
                name: username,
                email
            },
            password: {
                hash: password
            },
            consents: {
                terms: acceptTerms
            }
        })
        
        user.on(ModelEvent.AFTER_SAVE, this)

        const transaction = await this.connection.beginTransaction()

        return transaction.make(async (...transactionData) =>
        {
            try {
                if (await user.withTransaction(transactionData).save()) {
                    await transaction.commit()
                    return response.ok().with({ success: true })
                }

                await transaction.rollback()
                return response.badRequest().with({ success: false, message: user.errors.getFirstErrorFromAll() })
            }
            catch {
                await transaction.rollback()
                return response.internalError().with({ success: false, message: "Wystąpił błąd. Spróbuj ponownie później" })
            }
        })
    }

    public saveAvatar({ _id }: User): Promise<void>
    {
        const { avatar } = this.files
        if (avatar instanceof Array) {
            throw new SingleRequestFileException
        }

        const avatarName = _id + extname(avatar.name)
        const avatarPath = resolve(root(), "assets", "avatars", avatarName)

        return avatar.mv(avatarPath)
    }

    public async onEvent(event: AfterSaveEvent<UserSchema>): Promise<void>
    {
        const user = event.getTarget()

        if (user instanceof User) {
            await this.saveAvatar(user)
        }
    }
}