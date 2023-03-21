import { EventAlias } from "@data/symbols/EventAlias"

import Event from "@core/Event"

import "reflect-metadata"


export default function EventField<Target, Data, Prop extends keyof Data>(target: Event<Target, Data>, property: Prop)
{
    const aliases: Array<keyof Data> = Reflect.getOwnMetadata(EventAlias, target) || []
    aliases.push(property)
    Reflect.defineMetadata(EventAlias, aliases, target)
}