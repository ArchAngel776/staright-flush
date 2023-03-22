import { MeRequestData } from "../../../@types/request/MeRequestData"
import { MeResponseData } from "../../../@types/response/MeResponseData"
import UserInterface from "../../../@types/UserInterface"
import { UserType } from "../../../@types/UserType"

import { Route } from "../data/enums/Route"

import Api from "./Api"


export default class User implements UserInterface
{
    protected static instance: User

    protected data: UserInterface

    protected constructor(data: UserInterface)
    {
        this.data = data
    }

    public get type(): UserType
    {
        return this.data.type
    }

    public get id(): string
    {
        return this.data.id
    }

    public get username(): string
    {
        return this.data.username
    }

    public get email(): string
    {
        return this.data.email
    }

    public get avatar(): string
    {
        return this.data.avatar
    }

    public static async load(): Promise<void>
    {
        if (this.instance) {
            return
        }

        return new Promise((resolve, reject) => Api.get<MeRequestData, MeResponseData>(Route.ME)
            .on("response", response => {
                if (response.success) {
                    this.instance = new User(response.user)
                    resolve()
                }
                else {
                    reject(response.message)
                }
            })
            .on("error", response => {
                if (typeof response === "string") {
                    reject(response)
                }
                else if (!response.success && response.message) {
                    reject(response.message)
                }
                else {
                    reject()
                }
            })
            .send()
        )
    }

    public static get me(): User
    {
        return this.instance
    }
}