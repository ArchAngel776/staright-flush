export type ModelFirstErrorsData<Schema> = {
    [property in keyof Schema]?: string | undefined
}