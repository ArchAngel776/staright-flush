import { lookup } from "mime-types"

import Image from "@helpers/Image"


export default function isImage(image: string): boolean
{
    const type = lookup(image)
    return type ? Image.types().includes(type) : false
}