import { CommandConstructor } from "@data/types/CommandContructor"


export default interface Commands 
{
    [command: string]: CommandConstructor
}