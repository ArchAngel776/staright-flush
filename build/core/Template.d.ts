import TemplateParams from "./data/interfaces/TemplateParams";
import { CodePart } from "./data/types/CodePart";
import { Import } from "./data/types/Import";
export default abstract class Template {
    protected imports: Array<Import>;
    protected params: TemplateParams;
    constructor();
    import(): Array<Import>;
    addImport(imp: Import): this;
    with(param: string, value: string): this;
    abstract content(): string | Array<CodePart>;
    protected bindParams(content: string): string;
    protected compileContent(): string;
    make(): string;
}
