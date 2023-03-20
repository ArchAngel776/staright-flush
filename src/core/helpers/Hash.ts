import { createHash, BinaryToTextEncoding } from "crypto"

import { Alg } from "@data/enums/Alg"


export default class Hash
{
    protected static readonly algorithm: Alg = Alg.SHA256
    protected static readonly enconding: BinaryToTextEncoding = "hex"

    public static create(target: string, algorithm?: Alg): string
    {
        return createHash(algorithm || this.algorithm).update(target).digest(this.enconding)
    }

    public static compare(target: string, destiny: string, algorithm?: Alg): boolean
    {
        return this.create(target, algorithm) === destiny
    }
}