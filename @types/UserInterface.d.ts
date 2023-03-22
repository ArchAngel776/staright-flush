import { UserType } from "./UserType"

export default interface UserInterface
{
    type: UserType,
    id: string,
    username: string
    email: string
    avatar: string
}