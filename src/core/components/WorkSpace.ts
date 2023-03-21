import { resolve } from "path"
import { existsSync, lstatSync, readFileSync, readdirSync, writeFileSync, appendFileSync, mkdirSync, rmSync } from "fs"

import { Nullable } from "@data/types/Nullable"
import Utf8Encoding from "@data/interfaces/Utf8Encoding"


export default class WorkSpace
{
    protected spacePath: string

    public constructor(spacePath: string)
    {
        this.spacePath = spacePath
    }

    public exist(): boolean
    {
        return existsSync(this.spacePath)
    }

    public isWorkSpace(): boolean
    {
        return existsSync(this.spacePath) && lstatSync(this.spacePath).isDirectory()
    }

    public has(name: string): boolean
    {
        const path = resolve(this.spacePath, name)
        return existsSync(path)
    }

    public hasFile(name: string): boolean
    {
        const path = resolve(this.spacePath, name)
        return existsSync(path) && lstatSync(path).isFile()
    }

    public hasDir(name: string): boolean
    {
        const path = resolve(this.spacePath, name)
        return existsSync(path) && lstatSync(path).isDirectory()
    }

    public list(): Nullable<Array<string>>
    {
        return this.isWorkSpace() ? readdirSync(this.spacePath, this.encoding) : null
    }

    public get(name: string): Nullable<string>
    {
        if (this.hasFile(name)) {
            const path = resolve(this.spacePath, name)
            return readFileSync(path, this.encoding)
        }
        return null
    }

    public listDir(name: string): Nullable<Array<string>>
    {
        if (this.hasDir(name)) {
            const path = resolve(this.spacePath, name)
            return readdirSync(path, this.encoding)
        }
        return null
    }

    public save(name: string, content: string, append = false): void
    {
        if (!this.isWorkSpace()) {
            return
        }

        const path = resolve(this.spacePath, name)

        return append ?
            appendFileSync(path, content, this.encoding) :
            writeFileSync(path, content, this.encoding)
    }

    public createDir(name: string): void
    {
        if (this.isWorkSpace() && !this.hasDir(name)) {
            const path = resolve(this.spacePath, name)
            mkdirSync(path)
        }
    }

    public delete(name: string): void
    {
        if (!this.isWorkSpace()) {
            return
        }

        const path = resolve(this.spacePath, name)

        if (this.hasFile(name)) {
            rmSync(path)
        }
        else if (this.hasDir(name)) {
            rmSync(path, { recursive: true, force: true })
        }
    }

    public get path(): string
    {
        return this.spacePath
    }

    protected get encoding(): Utf8Encoding
    {
        return { encoding: "utf-8" }
    }
}