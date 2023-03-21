import { Join } from "mongodb"


export enum KeyofSign
{
    JOIN = "."
}

export type KeyofPaths<Schema> = Schema extends object ? { [Key in keyof Schema]: Schema[Key] extends Record<string, unknown> ? [ Key ] | [ Key, ...KeyofPaths<Schema[Key]> ] : [ Key ] }[keyof Schema] : []

export type Keyof<Schema> = Join<KeyofPaths<Schema>, KeyofSign.JOIN>