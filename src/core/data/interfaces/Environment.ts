import { NodeEnv } from "../enums/NodeEnv"

export default interface Environment extends NodeJS.ProcessEnv
{
    NODE_ENV: NodeEnv
    DB_HOST: string
    DB_PORT: string
    DB_USER: string
    DB_PASS: string
    DB_NAME: string
    DB_REPL: string
}