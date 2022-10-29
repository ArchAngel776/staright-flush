import { Import } from "../data/types/Import";
export default class TemplateImportCreator {
    static FIELDS_ALL: string;
    protected data: Import;
    constructor(data: Import);
    createImportLine(): string;
    protected templateFields(path: string, fields: Array<string>): string;
    protected templateAlias(path: string, alias: string): string;
    protected templateDefault(path: string, name: string): string;
    static create(data: Import): string;
}
