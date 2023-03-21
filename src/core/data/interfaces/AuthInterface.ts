import UserInterface from "./UserInterface"

export default interface AuthInterface
{
    isLogged(): boolean
    getUser(): UserInterface | null
    login(username: string, password: string): Promise<boolean>
    logout(): boolean
}