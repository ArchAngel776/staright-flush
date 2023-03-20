export type RequestErrors<Request> = Request extends object ? {
    [Prop in keyof Request]?: RequestErrors<Request[Prop]>
} : Array<string>