import UserInterface from "../../../../@types/UserInterface"


export default interface AuthInterface
{
    isLogged(): boolean
    getUser(): UserInterface | null
    login(username: string, password: string): Promise<boolean>
    remember(): void
    logout(): boolean
}