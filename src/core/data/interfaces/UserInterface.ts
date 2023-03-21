import { UserType } from "@data/types/UserType"


export default interface UserInterface
{
    type: UserType,
    id: string,
    username: string
    email: string
    avatar: string
}