import { CommandConstructor } from "../types/CommandContructor";
export default interface Commands {
    [command: string]: CommandConstructor;
}
