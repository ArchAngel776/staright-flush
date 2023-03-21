import { SessionOptions } from "express-session"
import * as Redis from "redis"
import RedisStore from "connect-redis"

import isProd from "@hooks/isProd"

import Env from "@env"


const client = Redis.createClient({
    socket: {
        host: Env.SESSION_BROKER_HOST,
        port: parseInt(Env.SESSION_BROKER_PORT)
    },
    username: Env.SESSION_BROKER_USER,
    password: Env.SESSION_BROKER_PASS
})

client.connect().catch(console.error)

export const SessionConfig: SessionOptions = {
    secret: Env.SESSION_SECRET,
    name: "straight-flush-session",
    store: new RedisStore({
        client,
        prefix: "straight-flush-session:"
    }),
    saveUninitialized: true,
    rolling: true,
    resave: false,
    cookie: {
        sameSite: "strict",
        httpOnly: true,
        secure: isProd(),
        maxAge: 10 * 60 * 1000
    }
}