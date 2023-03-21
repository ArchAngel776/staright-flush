import { join } from "path"

import assets from "@hooks/assets"


export default function publicPath(path?: string): string
{
    const segments = ["public"]
    if (path) {
        segments.push(path)
    }
    return assets(join(...segments))
}