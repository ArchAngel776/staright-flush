import { NodeEnv } from "@data/enums/NodeEnv"


export default interface Environment extends NodeJS.ProcessEnv
{
    NODE_ENV: NodeEnv
    HOST: string
    PORT: string
    SESSION_SECRET: string
    DB_HOST: string
    DB_PORT: string
    DB_REPL: string
    DB_USER: string
    DB_PASS: string
    DB_NAME: string
    SESSION_BROKER_HOST: string
    SESSION_BROKER_PORT: string
    SESSION_BROKER_USER: string
    SESSION_BROKER_PASS: string
}