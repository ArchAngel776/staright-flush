import { Import } from "../data/types/Import"

export default class TemplateImportCreator
{
    public static FIELDS_ALL = "*"

    protected data: Import

    public constructor(data: Import)
    {
        this.data = data
    }

    public createImportLine(): string
    {
        const [ path, fields, alias ] = this.data
        if (fields instanceof Array) {
            return this.templateFields(path, fields)
        }
        else if (fields === TemplateImportCreator.FIELDS_ALL && typeof alias !== "undefined") {
            return this.templateAlias(path, alias)
        }
        return this.templateDefault(path, fields)
    }

    protected templateFields(path: string, fields: Array<string>): string
    {
        return `const { ${fields.join(", ")} } = require("${path}")`
    }

    protected templateAlias(path: string, alias: string): string
    {
        return `const ${alias} = require("${path}")`
    }

    protected templateDefault(path: string, name: string): string
    {
        return `const ${name} = require("${path}").default`
    }

    public static create(data: Import): string
    {
        return new TemplateImportCreator(data).createImportLine()
    }
}