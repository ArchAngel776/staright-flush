import { CodePart } from "../data/types/CodePart";
export default class CodeNeaster {
    static TAB: string;
    static CODE_OPEN: string;
    static CODE_CLOSE: string;
    static CODE_LINE: string;
    protected codeParts: Array<CodePart>;
    constructor(codeParts: Array<CodePart>);
    protected compileParts(parts: Array<CodePart>, tabulator?: number): Array<string>;
    protected tabLine(line: string, tabulation: number): string;
    compile(): string;
}
