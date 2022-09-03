import { NodeEnv } from "../enums/NodeEnv"

export default interface Environment extends NodeJS.ProcessEnv
{
    NODE_ENV: NodeEnv
}