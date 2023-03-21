import TemplateParams from "@data/interfaces/TemplateParams"
import { CodePart } from "@data/types/CodePart"
import { Import } from "@data/types/Import"

import CodeNeaster from "@components/CodeNeaster"
import TemplateImportCreator from "@components/TemplateImportCreator"


export default abstract class Template
{
    protected imports: Array<Import>

    protected params: TemplateParams

    public constructor()
    {
        this.imports = this.import()
        this.params = {}
    }

    public import(): Array<Import>
    {
        return []
    }

    public addImport(imp: Import): this
    {
        this.imports.push(imp)
        return this
    }

    public withParams(params: TemplateParams): this
    {
        for (const param in params) {
            this.with(param, params[param])
        }
        return this
    }

    public with(param: string, value: string): this
    {
        this.params[param] = value
        return this
    }

    public abstract content(): string | Array<CodePart>

    protected bindParams(content: string): string
    {
        for (const param in this.params) {
            content = content.replaceAll(new RegExp(`@${param}`, "gm"), this.params[param])
        }
        return content
    }

    protected compileContent(): string
    {
        const content = this.content()
        return content instanceof Array ? new CodeNeaster(content).compile() : content
    }

    public make(): string
    {
        const imports = this.imports.map(TemplateImportCreator.create).join("\n")
        return `${imports}\n\n${this.bindParams(this.compileContent())}`
    }
}