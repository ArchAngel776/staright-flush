export interface RegisterRequestData
{
    username: string
    email: string
    password: string
    confirmPassword: string
    acceptTerms: "on" | "off"
}