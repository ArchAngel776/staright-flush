export type WithCsrf<Data> = Data & {
    _csrf_token: string
}