import UserInterface from "@data/interfaces/UserInterface"

export type MeResponseData = {
    success: true
    user: UserInterface
} | {
    success: false
    message: string
}