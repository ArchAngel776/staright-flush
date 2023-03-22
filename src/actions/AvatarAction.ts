import { existsSync, readFileSync } from "fs"
import { lookup } from "mime-types"

import ResponseInterface from "@data/interfaces/ResponseInterface"
import { Data } from "@data/types/Data"

import getAvatar from "@hooks/getAvatar"

import Action from "@core/Action"


export default class AvatarAction extends Action<object, Data>
{
    public make(response: ResponseInterface<Data>): ResponseInterface<Data>
    {
        if (!this.has("avatar")) {
            return response.badRequest().with("URL params error")
        }

        const avatar = getAvatar(this.get("avatar"))

        if (!existsSync(avatar)) {
            return response.notFound().with("Avatar wasn't founded")
        }

        const avatarFile = readFileSync(avatar)
        const mimeType = lookup(avatar)

        if (!avatarFile || !mimeType) {
            return response.internalError().with("Couldn't fetch avatar")
        }

        return response.header("content-type", mimeType).with(avatarFile)
    }
}