export type ErrorMessage<Data> =
{
    [Prop in keyof Data]?: string | undefined
}