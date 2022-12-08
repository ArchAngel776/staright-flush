export type ModelErrorsData<Schema> = {
    [property in keyof Schema]?: Array<string> | undefined
}