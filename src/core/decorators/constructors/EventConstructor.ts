import { Constructor } from "@data/types/Constructor"

import Event from "@core/Event"


export type EventConstructor<Data> = Constructor<Event<unknown, Data> & {
    getName(): string
}>