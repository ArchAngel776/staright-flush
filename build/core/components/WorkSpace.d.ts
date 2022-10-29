import { Nullable } from "../data/types/Nullable";
import Utf8Encoding from "../data/interfaces/Utf8Encoding";
export default class WorkSpace {
    protected spacePath: string;
    constructor(spacePath: string);
    exist(): boolean;
    isWorkSpace(): boolean;
    has(name: string): boolean;
    hasFile(name: string): boolean;
    hasDir(name: string): boolean;
    list(): Nullable<string[]>;
    get(name: string): Nullable<string>;
    listDir(name: string): Nullable<string[]>;
    save(name: string, content: string, append?: boolean): void;
    createDir(name: string): void;
    delete(name: string): void;
    get path(): string;
    protected get encoding(): Utf8Encoding;
}
