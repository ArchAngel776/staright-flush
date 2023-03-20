import { EventAlias } from "@data/symbols/EventAlias"

import { EventConstructor } from "@decorators/constructors/EventConstructor"

import Event from "@core/Event"

import "reflect-metadata"


const descriptor = <Target, Data>(alias: keyof Data): PropertyDescriptor => ({
    get(this: Event<Target, Data>) {
        return this.data[alias]
    },
    set(this: Event<Target, Data>, value: Data[keyof Data]) {
        this.data[alias] = value
    }
})

export default function EventSignature<Data>()
{
    return function <Target extends EventConstructor<Data>>(Target: Target): Target
    {
        return class extends Target
        {
            public constructor(...args: ConstructorParameters<EventConstructor<Data>>)
            {
                super(...args)

                const aliases: Array<keyof Data> = Reflect.getOwnMetadata(EventAlias, Target.prototype) || []
                aliases.forEach(alias => Reflect.defineProperty(this, alias, descriptor(alias)))
            }
        }
    }
}