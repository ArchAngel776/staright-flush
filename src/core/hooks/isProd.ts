import { NodeEnv } from "@data/enums/NodeEnv"

import Env from "@env"


export default function isProd(): boolean
{
    return Env.NODE_ENV === NodeEnv.PROD
}