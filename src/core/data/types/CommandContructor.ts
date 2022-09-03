import Command from "../../Command"

export type CommandConstructor = new (...args: Array<string>) => Command