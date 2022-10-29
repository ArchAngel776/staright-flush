import { CommandConstructor } from "./core/data/types/CommandContructor";
export default class Cli {
    protected command: string;
    protected arguments: Array<string>;
    constructor(command: string, ...args: Array<string>);
    protected getCommand(): CommandConstructor;
    run(): Promise<void>;
}
