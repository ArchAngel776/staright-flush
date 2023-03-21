import { format } from "path"
import { readdirSync } from "fs"

import { AvatarExpression } from "@components/expressions/AvatarExpression"

import assets from "@hooks/assets"
import isImage from "@hooks/isImage"


export default function avatar(id: string): string | false
{
    const avatars = readdirSync(assets("avatars"))
    for (const avatar of avatars) {
        if (AvatarExpression(id).test(avatar) && isImage(avatar)) {
            return format({
                dir: "avatar",
                base: avatar
            })
        }
    }
    return false
}