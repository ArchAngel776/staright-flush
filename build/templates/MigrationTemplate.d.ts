import { CodePart } from "../core/data/types/CodePart";
import { Import } from "../core/data/types/Import";
import Template from "../core/Template";
export default class MigrationTemplate extends Template {
    static PARAM_BASE: string;
    static PARAM_MIGRATION: string;
    import(): Array<Import>;
    content(): Array<CodePart>;
}
