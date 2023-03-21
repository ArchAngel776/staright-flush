import { resolve } from "path"

import root from "@hooks/root"


export default function assets(path?: string): string
{
    const segments = [root(), "assets"]
    if (path) {
        segments.push(path)
    }
    return resolve(...segments)
}