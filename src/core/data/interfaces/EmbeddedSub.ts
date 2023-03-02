export type EmbeddedSubDoc<Schema extends object> = {
    [Key in keyof Schema]: Schema[Key] extends object ? EmbeddedSub<Schema[Key]> : never
}

export type EmbeddedSub<Schema> = Schema extends object ? Schema | EmbeddedSubDoc<Schema>[keyof Schema] : never