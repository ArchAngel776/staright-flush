export type ImportFields = string | Array<string>

export type ImportAlias = string | undefined

export type Import = [ path: string, fields: ImportFields, alias?: ImportAlias ]