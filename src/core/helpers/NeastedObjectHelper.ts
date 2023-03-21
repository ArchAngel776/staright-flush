/* eslint-disable @typescript-eslint/no-unused-vars */
import { Constructor } from "@data/types/Constructor"
import { Keyof, KeyofSign } from "@data/types/Keyof"
import { Valueof } from "@data/types/Valueof"
import type { NeastedObjectChain } from "@data/types/NeastedObject"

import Method from "@helpers/Method"
import NeastedObjectEmptyValue from "@decorators/helpers/NeastedObjectEmptyValue"
import NeastedObjectSetter from "@decorators/helpers/NeastedObjectSetter"


export default class NeastedObjectHelper<Schema>
{
    protected target: Schema

    public constructor(target: Schema)
    {
        this.target = target
        this.getReducer = this.getReducer.bind(this)
        this.setReducer = this.setReducer.bind(this)
    }

    public get<Keys extends Keyof<Schema>>(keypath: Keys): Valueof<Schema, Keys>
    {
        const result = keypath.split(KeyofSign.JOIN).reduce(this.getReducer, <NeastedObjectChain<Schema>> this.target)
        return <Valueof<Schema, Keys>> result
    }

    public set<Keys extends Keyof<Schema>>(keypath: Keys, value: Valueof<Schema, Keys>): this
    {
        this.target = <Schema> keypath.split(KeyofSign.JOIN).reduceRight(this.setReducer, <NeastedObjectChain<Schema>> value)
        return this
    }

    @Method(<Constructor<NeastedObjectEmptyValue<Schema>>> NeastedObjectEmptyValue)
    protected getReducer<Value extends NeastedObjectChain<Schema>>(value: Value, key: string): NeastedObjectChain<Schema>
    {
        const index = <Extract<keyof Value, string>> key
        return <NeastedObjectChain<Schema>> value[index]
    }

    @Method(<Constructor<NeastedObjectSetter<Schema>>> NeastedObjectSetter)
    protected setReducer<Value extends NeastedObjectChain<Schema>, SubValue extends Valueof<Schema, Keyof<Schema>>>(value: Value, key: string, currentIndex: number, keys: Array<string>): NeastedObjectChain<Schema>
    {
        const subKeys = keys.slice(0, -currentIndex).join(KeyofSign.JOIN)
    
        const overValue = (this.get(<Keyof<Schema>> subKeys) || {}) as SubValue
        const index = <Extract<keyof SubValue, string>> key
            
        overValue[index] = <SubValue[Extract<keyof SubValue, string>]> value
        return <NeastedObjectChain<Schema>> overValue
    }

    public get result(): Schema
    {
        return this.target
    }
}