import { join } from "path"
import assets from "./assets"

export default function getAvatar(avatar: string): string
{
    return assets(join("avatars", avatar))
}