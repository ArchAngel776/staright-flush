import { CodePart } from "../data/types/CodePart"

export default class CodeNeaster
{
    public static TAB = "\t"

    public static CODE_OPEN = "{"
    public static CODE_CLOSE = "}"
    public static CODE_LINE = "\n"

    protected codeParts: Array<CodePart>

    public constructor(codeParts: Array<CodePart>)
    {
        this.codeParts = codeParts
    }

    protected compileParts(parts: Array<CodePart>, tabulator = 0): Array<string>
    {
        const result = []

        for (const part of parts) {
            if (part instanceof Array) {
                result.push(
                    this.tabLine(CodeNeaster.CODE_OPEN, tabulator), 
                    ...this.compileParts(part, tabulator + 1), 
                    this.tabLine(CodeNeaster.CODE_CLOSE, tabulator)
                )
            }
            else {
                result.push(this.tabLine(part, tabulator))
            }
        }

        return result
    }

    protected tabLine(line: string, tabulation: number): string
    {
        return `${CodeNeaster.TAB.repeat(tabulation)}${line}`
    }

    public compile(): string
    {
        return this.compileParts(this.codeParts).join(CodeNeaster.CODE_LINE)
    }
}