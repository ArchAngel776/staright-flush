import { Session, SessionData } from "express-session"

import UserInterface from "../../../@types/UserInterface"

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
    protected session: Session & Partial<SessionData>

    protected repository: UserRepository

    protected constructor(session: Session & Partial<SessionData>)
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

    public remember(): void
    {
        if (this.session.cookie) {
            this.session.cookie.maxAge = 5 * 365 * 24 * 60 * 60 * 1000
        }
    }

    public logout(): boolean
    {
        delete this.session.resetMaxAge().user
        return !this.isLogged()
    }

    public static open(session: Session & Partial<SessionData>): AuthManager
    {
        return new AuthManager(session)
    }
}