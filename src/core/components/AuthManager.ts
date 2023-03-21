import { SessionData } from "express-session"

import UserInterface from "@data/interfaces/UserInterface"
import AuthInterface from "@data/interfaces/AuthInterface"

import defined from "@hooks/defined"

import UserRepository from "@repositories/UserRepository"


declare module "express-session"
{
    interface SessionData
    {
        user?: UserInterface
    }
}

export default class AuthManager implements AuthInterface
{
    protected session: Partial<SessionData>

    protected repository: UserRepository

    protected constructor(session: Partial<SessionData>)
    {
        this.session = session
        this.repository = new UserRepository
    }

    public isLogged(): boolean
    {
        return defined(this.session.user)
    }

    public getUser(): UserInterface | null
    {
        return this.session.user || null
    }

    public async login(username: string, password: string): Promise<boolean>
    {
        const user = await this.repository.findByUsername(username)

        if (user && user.checkPassword(password)) {
            this.session.user = user.getInterface() || undefined
            return this.isLogged()
        }

        return false
    }

    public logout(): boolean
    {
        delete this.session.user
        return !this.isLogged()
    }

    public static open(session: Partial<SessionData>): AuthManager
    {
        return new AuthManager(session)
    }
}