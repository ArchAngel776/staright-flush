export type ErrorMessage<Data> = {
    [property in keyof Data]?: string | undefined
}